function doPost(e) {    //引数eはdoPost関数に自動で渡されるHTTPリクエスト情報が入ったオブジェクト

    writeLog(e.postData.contents);

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

            case userMessage === "電気代設定":
                replyMessage = `今月の目標電気代は ${INPUT_ENERGY_COST} 円、これまでの電気代は${GENZAI_DENKIDAI}です。変更する場合、半角数字で入力してください。`;
                PropertiesService.getScriptProperties().setProperty("WHICHSTATE", "0"); //WHICHSTATEを0に設定
                break;

            case userMessage === "支出額設定":
                replyMessage = `今月の目標支出額は ${INPUT_EXPENSE} 円、これまでの支出額は${EXPENSE}です。変更する場合、半角数字で入力してください。`;
                PropertiesService.getScriptProperties().setProperty("WHICHSTATE", "1"); //WHICHSTATEを1に設定
                break;

            case (/^\d+$/.test(userMessage)) && (WHICHSTATE === "0"):  //半角数字かつ電気代設定
                PropertiesService.getScriptProperties().setProperty("INPUT_ENERGY_COST", userMessage);
                replyMessage = `今月の目標電気代を ${userMessage} 円に設定しました。`;

                // ここで設定し直した電気代と今までの電気代を比較し直す
                if (FORCEOFF_ENERGY === "1") {
                    // 操作がストップしている場合
                    const energy = parseInt(GENZAI_DENKIDAI, 10);
                    const in_energy = parseInt(userMessage, 10);

                    if (energy < in_energy) {
                        PropertiesService.getScriptProperties().setProperty("FORCEOFF_ENERGY", "0");
                        replyMessage = `今月の目標電気代を ${userMessage} 円に設定しました。電気の操作が復活しました。`;
                    } else {
                        replyMessage = `今月の目標電気代を ${userMessage} 円に設定しました。まだ電気の操作は行えません。`;
                    }

                } else {
                    // 操作可能なとき
                    const energy = parseInt(GENZAI_DENKIDAI, 10);
                    const in_energy = parseInt(userMessage, 10);

                    if (energy < in_energy) {
                        PropertiesService.getScriptProperties().setProperty("FORCEOFF_ENERGY", "0");
                        replyMessage = `今月の目標電気代を ${userMessage} 円に設定しました。`;
                    } else {
                        PropertiesService.getScriptProperties().setProperty("FORCEOFF_ENERGY", "1");
                        replyMessage = `今月の目標電気代を ${userMessage} 円に設定しました。電気の操作が停止しました。`;
                    }

                }

                break;

            case (/^\d+$/.test(userMessage)) && (WHICHSTATE === "1"):  //半角数字かつ支出額設定
                PropertiesService.getScriptProperties().setProperty("INPUT_EXPENSE", userMessage);
                replyMessage = `今月の目標支出額を ${userMessage} 円に設定しました。`;


                // ここで設定し直した支出額と今までの支出額を比較し直す
                if (FORCEOFF_EXPENSE === "1") {
                    // 操作がストップしている場合
                    const expense = parseInt(EXPENSE, 10);
                    const in_expense = parseInt(userMessage, 10);

                    if (expense < in_expense) {
                        PropertiesService.getScriptProperties().setProperty("FORCEOFF_EXPENSE", "0");
                        replyMessage = `今月の目標支出額を ${userMessage} 円に設定しました。電気の操作が復活しました。`;
                    } else {
                        PropertiesService.getScriptProperties().setProperty("FORCEOFF_EXPENSE", "1");
                        replyMessage = `今月の目標支出額を ${userMessage} 円に設定しました。まだ電気の操作は行えません。`;
                    }

                } else {
                    // 操作可能なとき
                    const expense = parseInt(EXPENSE, 10);
                    const in_expense = parseInt(userMessage, 10);

                    if (expense < in_expense) {
                        PropertiesService.getScriptProperties().setProperty("FORCEOFF_EXPENSE", "0");
                        replyMessage = `今月の目標支出額を ${userMessage} 円に設定しました。`;
                    } else {
                        PropertiesService.getScriptProperties().setProperty("FORCEOFF_EXPENSE", "1");
                        replyMessage = `今月の目標支出額を ${userMessage} 円に設定しました。電気の操作が停止しました。`;
                    }
                }

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
            const idosa = (ido - parseFloat(LATITUDE, 10)) * 111;
            const keidosa = (keido - parseFloat(LONGITUDE, 10)) * 90;
            const jijyounowa = (idosa ** 2) + (keidosa ** 2);
            const kyori = Math.sqrt(jijyounowa);
            if (kyori > 1) {                                  // 1km以内ならば
                LightOff();            //ライトを消す
                SendLineMessage("1km以上離れたのでライトを消しました。");
            }
        }
    }
}