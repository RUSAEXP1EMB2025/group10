function doPost(e) {    //引数eはdoPost関数に自動で渡されるHTTPリクエスト情報が入ったオブジェクト
    const data = JSON.parse(e.postData.contents);   //e.postData.contentsに送られてきた内容が格納されている.JSON形式なのでオブジェクトに変換
    const replyToken = data.events[0].replyToken;   //返信に必要なトークンを取り出す
    const userMessage = data.events[0].message.text.trim();    //送られてきたメッセージの内容を取り出す.trim()で空白除去

    let replyMessage; //返信するメッセージ
    let isOver; //目標電気代を超えたかどうかを判断(0:超えてない,1:超えた)


    switch (true) {

        case userMessage === "on":

            //既に点灯しているとき
            if (LightState() === "on") {
                replyMessage = "既に点灯しています。";
                break;
            }

            // 目標電気代を超えているとき
            if (FORCEOFF_ENERGY === "1") {
                replyMessage = "今月はすでに目標電気代を超えているので照明をつけることができません。どうしてもつけたい場合は目標電気代を変更してください。"
                break;
            }

            // 目標支出額を超えているとき
            if (FORCEOFF_EXPENSE === "1") {
                replyMessage = "今月はすでに目標支出額を超えているので照明をつけることができません。どうしてもつけたい場合は目標支出額を変更してください。"
                break;
            }

            setSensorData("オン");  //シートに書き込み
            LightOn();            //ライトをつける
            replyMessage = "ライトをつけました。";
            break;

        case userMessage === "off":

            //既に点灯しているとき
            if (LightState() === "off") {
                replyMessage = "既に消灯しています。";
                break;
            }

            setSensorData("オフ");  //シートに書き込み
            LightOff();            //ライトを消す
            replyMessage = "ライトを消しました。";

            isOver = calc_energy(); //ライトを消す度に電気代を計算し,目標と比較

            //目標金額を超えた時(現時点では勧告のみ)
            if (isOver === 1) {
                replyMessage = "ライトを消しました。今月の目標金額を超えました。";
            } else {
                replyMessage = "ライトを消しました。今月の現在の使用電気代は " + PropertiesService.getScriptProperties().getProperty("GENZAI_DENKIDAI") + " 円です。";
            }
            break;

        case userMessage === "電気代設定":
            replyMessage = `今月の目標電気代は ${INPUT_ENERGY_COST} 円です。変更する場合、半角数字で入力してください。`;
            PropertiesService.getScriptProperties().setProperty("WHICHSTATE", "0"); //WHICHSTATEを0に設定
            break;

        case userMessage === "支出額設定":
            replyMessage = `今月の目標支出額は ${INPUT_EXPENSE} 円です。変更する場合、半角数字で入力してください。`;
            PropertiesService.getScriptProperties().setProperty("WHICHSTATE", "1"); //WHICHSTATEを1に設定
            break;

        case (/^\d+$/.test(userMessage)) && (WHICHSTATE === "0"):  //半角数字かつ電気代設定
            PropertiesService.getScriptProperties().setProperty("INPUT_ENERGY_COST", userMessage);
            replyMessage = `今月の目標電気代を ${userMessage} 円に設定しました。`;

            if (FORCEOFF_ENERGY === "1") {
                //計算し直し
                break;
            }

            break;

        case (/^\d+$/.test(userMessage)) && (WHICHSTATE === "1"):  //半角数字かつ支出額設定
            PropertiesService.getScriptProperties().setProperty("INPUT_EXPENSE", userMessage);
            replyMessage = `今月の目標支出額を ${userMessage} 円に設定しました。`;

            if (FORCEOFF_EXPENSE === "1") {
                //計算し直し
                break;
            }

            break;

        default:
            replyMessage = "無効なテキストです";
    }

    ReplyLineMessage(replyToken, replyMessage);
}