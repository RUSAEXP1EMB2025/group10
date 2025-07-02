function doPost(e) {    //引数eはdoPost関数に自動で渡されるHTTPリクエスト情報が入ったオブジェクト
    const data = JSON.parse(e.postData.contents);   //e.postData.contentsに送られてきた内容が格納されている.JSON形式なのでオブジェクトに変換
    if (Array.isArray(data.events)) {
        const replyToken = data.events[0].replyToken;   //返信に必要なトークンを取り出す
        const userMessage = data.events[0].message.text.trim();    //送られてきたメッセージの内容を取り出す.trim()で空白除去

        let replyMessage; //返信するメッセージ
        let isOver; //目標電気代を超えたかどうかを判断(0:超えてない,1:超えた)


        switch (true) {

            case userMessage === "on":

                //既に点灯しているとき
                if (LIGHT_STATE === "1") {
                    replyMessage = "既に点灯しています。"
                    break;
                }

                // 目標電気代を超えているとき
                if ((FORCEOFF_ENERGY === "1") && (FORCEOFF_EXPENSE !== "1")) {
                    replyMessage = "今月はすでに目標電気代を超えているので照明をつけることができません。どうしてもつけたい場合は目標電気代を変更してください。"
                    break;
                }

                // 目標支出額を超えているとき
                if ((FORCEOFF_ENERGY !== "1") && (FORCEOFF_EXPENSE === "1")) {
                    replyMessage = "今月はすでに目標支出額を超えているので照明をつけることができません。どうしてもつけたい場合は目標支出額を変更してください。"
                    break;
                }

                // どちらも超えているとき
                if ((FORCEOFF_ENERGY === "1") && (FORCEOFF_EXPENSE === "1")) {
                    replyMessage = "目標電気代、支出額をどちらも超えています。どうしてもつけたい場合は目標金額を変更してください。"
                    break;
                }

                setSensorData("オン");  //シートに書き込み
                LightOn();            //ライトをつける
                replyMessage = "ライトをつけました。";
                break;

            case userMessage === "off":

                //既に消灯しているとき
                if (LIGHT_STATE === "0") {
                    replyMessage = "既に消灯しています。"
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

            case userMessage === "詳細設定":
                replyMessage = "A.電気代設定をする\nB.支出額設定をする\nC.自宅の緯度経度を再設定する\nD.操作するNature Remoを変更する\nE.やっぱりやめる";
                PropertiesService.getScriptProperties().setProperty("SETTING", "1");
                break;

            case SETTING === "1":
                replyMessage = setting(userMessage);
                break;

            default:
                replyMessage = "無効なテキストです";
        }

        ReplyLineMessage(replyToken, replyMessage);
    } else {

        if (LIGHT_STATE === "0") { //ライトoffの時
            return;
        } else { //ライトonの時
            // 緯度・経度を取り出す
            const latitude = data.lat;
            const longitude = data.lon;
            const ido = parseFloat(latitude, 10);
            const keido = parseFloat(longitude, 10);
            const idosa = (ido - parseFloat(REMO_IDO, 10)) * 111;
            const keidosa = (keido - parseFloat(REMO_KEIDO, 10)) * 90;
            const jijyounowa = (idosa ** 2) + (keidosa ** 2);
            const kyori = Math.sqrt(jijyounowa);
            if (kyori > 1) {                                  // 1km以内ならば
                LightOff();            //ライトを消す
                SendLineMessage("1km以上離れたのでライトを消しました。");
            }
        }
    }
}