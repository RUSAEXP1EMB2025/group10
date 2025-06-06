//送信する関数(ブロードキャスト)
function SendLineMessage(message) {

    //ヘッダーを定義
    const headers = {
        'Content-Type': 'application/json', //ペイロードの形式
        'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN  //LINEサーバへの認証情報
    }

    //ペイロードを定義
    const payload = {
        //keyを配列にする(中身はオブジェクト)
        "messages": [
            {
                "type": "text", //テキストメッセージを送る
                "text": message //中身は引数のmessage
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
    UrlFetchApp.fetch(LINE_BROADCAST_ENDPOINT, options);
}

//返信する関数
function ReplyLineMessage(replyToken, replyMessage) {

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
                text: replyMessage  //引数のreplyMessage
            }
        ]
    };

    //UrlFetchApp.fetch()に渡す設定
    const options = {
        'method': 'post',   //POSTメソッドを使用
        'headers': headers,  //上で定義したヘッダー
        'payload': JSON.stringify(payload)  //上で定義したpayloadをJSON形式に変換して送信
    };

    /*
    UrlFetchApp.fetch(url,options)はGASから外部のWeb APIへHTTPリクエストを送る関数
    url：通信先のurl
    options：通信方法やヘッダーなどの設定オブジェクト
    */
    UrlFetchApp.fetch(LINE_REPLY_ENDPOINT, options);
}