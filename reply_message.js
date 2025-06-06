function doPost(e) {    //引数eはdoPost関数に自動で渡されるHTTPリクエスト情報が入ったオブジェクト
    const data = JSON.parse(e.postData.contents);   //e.postData.contentsに送られてきた内容が格納されている.JSON形式なのでオブジェクトに変換
    const replyToken = data.events[0].replyToken;   //返信に必要なトークンを取り出す
    const userMessage = data.events[0].message.text;    //送られてきたメッセージの内容を取り出す

    let replyMessage;

    if (userMessage === "on") {
        LightSet();
        replyMessage = "ライトをつけました";
    } else if (userMessage === "off") {
        LightSet();
        replyMessage = "ライトを消しました";
    } else {
        replyMessage = "無効なテキストです";
    }

    //ヘッダーを定義
    const headers = {
        'Content-Type': 'application/json', //ペイロードの形式
        'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN  //LINEサーバへの認証情報
    }

    //ペイロードを定義
    const payload = {
        replyToken: replyToken, //返信用トークン
        messages: [
            {
                type: 'text',   //テキストメッセージを送る
                text: replyMessage  //中身は上で宣言したreplyMessage
            }
        ]
    };

    //UrlFetchApp.fetch()に渡す設定
    const options = {
        'method': 'post',   //POSTメソッドを使用
        'headers': headers,  //ヘッダーは上で定義したheaders
        'payload': JSON.stringify(payload)  //ペイロードは上で定義したpayloadをJSON形式に変換して送信
    };

    /*
    UrlFetchApp.fetch(url,options)はGASから外部のWeb APIへHTTPリクエストを送る関数
    url：通信先のurl
    options：通信方法やヘッダーなどの設定オブジェクト
    */
    UrlFetchApp.fetch(LINE_REPLY_ENDPOINT, options);
}