function doPost(e) {    //引数eはdoPost関数に自動で渡されるHTTPリクエスト情報が入ったオブジェクト
    const data = JSON.parse(e.postData.contents);   //e.postData.contentsに送られてきた内容が格納されている.JSON形式なのでオブジェクトに変換
    const replyToken = data.events[0].replyToken;   //返信に必要なトークンを取り出す
    const userMessage = data.events[0].message.text.trim();    //送られてきたメッセージの内容を取り出す.trim()で空白除去

    let replyMessage; //返信するメッセージ
    let isOver; //目標電気代を超えたかどうかを判断(0:超えてない,1:超えた)

    if (userMessage === "on") {
        setSensorData("オン");  //シートに書き込み
        LightSet();            //ライトをつける
        replyMessage = "ライトをつけました";
    } else if (userMessage === "off") {
        setSensorData("オフ");  //シートに書き込み
        LightSet();            //ライトを消す
        replyMessage = "ライトを消しました";

        isOver = calc_energy(); //ライトを消す度に電気代を計算し,目標と比較

        //目標金額を超えた時(現時点では勧告のみ)
        if (isOver === 1) {
            replyMessage = "ライトを消しました.今月の目標金額を超えました."
        }

    } else if (/^\d+$/.test(userMessage)) {  // 条件は「半角数字だけなら」つまり金額
        /*
        受け取った金額をINPUT_ENERGY_COSTとしてスクリプトプロパティに格納する.
        setPropertyの引数は(key,value)になっている.
        */
        PropertiesService.getScriptProperties().setProperty("INPUT_ENERGY_COST", userMessage);
        replyMessage = `今月の電気代目標を ${userMessage} 円に設定しました`;
    } else if (userMessage === "電気代設定") {
        replyMessage = `今月の目標金額は ${INPUT_ENERGY_COST} 円です`;
    } else {
        replyMessage = "無効なテキストです";
    }

    ReplyLineMessage(replyToken, replyMessage);
}