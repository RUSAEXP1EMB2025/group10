function setting(userMessage) {

    let replyMessage;

    switch (true) {

        // 電気代設定の第一段階
        case userMessage === "A":
            replyMessage = `今月の目標電気代は ${INPUT_ENERGY_COST} 円、これまでの電気代は${GENZAI_DENKIDAI}です。変更する場合、半角数字で入力してください。`;
            PropertiesService.getScriptProperties().setProperty("WHICHSTATE", "0"); //WHICHSTATEを0に設定
            break;

        // 支出額設定の第一段階    
        case userMessage === "B":
            replyMessage = `今月の目標支出額は ${INPUT_EXPENSE} 円、これまでの支出額は${EXPENSE}です。変更する場合、半角数字で入力してください。`;
            PropertiesService.getScriptProperties().setProperty("WHICHSTATE", "1"); //WHICHSTATEを1に設定
            break;

        // 電気代設定の第二段階
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

                // 詳細設定の終了
                PropertiesService.getScriptProperties().setProperty("SETTING", "0");

            }

            break;

        // 支出額設定の第二段階
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

            // 詳細設定の終了
            PropertiesService.getScriptProperties().setProperty("SETTING", "0");

            break;

        // 自宅の緯度経度の第一段階    
        case userMessage === "C":
            replyMessage = "あなたの自宅の住所を入力してください";
            PropertiesService.getScriptProperties().setProperty("ISLOCATION", "1"); //ISLOCATIONを1に設定
            break;

        case ISLOCATION === "1":

            // convertAddress(userMessage);
            
            PropertiesService.getScriptProperties().setProperty("ISLOCATION", "0"); //ISLOCATIONを0に戻す

            // 詳細設定の終了
            PropertiesService.getScriptProperties().setProperty("SETTING", "0");
            break;
        
        case userMessage === "D":
            replyMessage = "Nature Remoのアクセストークンを入力してください";
            PropertiesService.getScriptProperties().setProperty("ISTOKEN", "1"); //ISTOKENを1に設定
            break;

        case ISTOKEN === "1":
            PropertiesService.getScriptProperties().setProperty("REMO_ACCESS_TOKEN", userMessage); //REMO_ACCESS_TOKENを1に設定
            PropertiesService.getScriptProperties().setProperty("ISTOKEN", "0"); //ISTOKENを0に戻す

            // 詳細設定の終了
            PropertiesService.getScriptProperties().setProperty("SETTING", "0");

            break;

        case userMessage === "E":

            replyMessage = "詳細設定を終了しました。";

            // 詳細設定の終了
            PropertiesService.getScriptProperties().setProperty("SETTING", "0");

            break;
            
        default:
            replyMessage = "無効なテキストです";
    }

    return replyMessage;
}