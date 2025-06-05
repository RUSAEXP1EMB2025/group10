function doPost(e) {
    const data = JSON.parse(e.postData.contents);
    const replyToken = data.events[0].replyToken;
    const userMessage = data.events[0].message.text;

    Logger.log("ユーザーのメッセージ: " + userMessage);

    let replyMessage;

    if (userMessage === "on") {
        replyMessage = "ライトをつけました";
    } else if (userMessage === "off") {
        replyMessage = "ライトを消しました";
    } else {
        replyMessage = "無効なテキストです";
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN
    };

    const payload = {
        replyToken: replyToken,
        messages: [
            {
                type: 'text',
                text: replyMessage
            }
        ]
    };

    const options = {
        method: 'post',
        headers: headers,
        payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(LINE_REPLY_ENDPOINT, options);
}