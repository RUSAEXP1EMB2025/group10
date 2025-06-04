function doPost(e) {
    const LINE_ACCESS_TOKEN = '71314fb8cd8690328fea961664b86b06';
    const replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
    const userMessage = JSON.parse(e.postData.contents).events[0].message.text;

    let replyText = '';

    if (userMessage === 'オン') {
        const state = getLightState();
        if (state === 'on') {
            replyText = 'すでに電気はついています。';
        } else {
            toggleLight();
            replyText = '電気をつけました。';
        }
    } else if (userMessage === 'オフ') {
        const state = getLightState();
        if (state === 'off') {
            replyText = 'すでに電気は消えています。';
        } else {
            toggleLight();
            replyText = '電気を消しました。';
        }
    } else if (userMessage === '状態') {
        const state = getLightState();
        replyText = `現在の電気の状態は「${state}」です。`;
    } else {
        replyText = '「オン」「オフ」「状態」のどれかを送ってください。';
    }

    UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${LINE_ACCESS_TOKEN}`
        },
        payload: JSON.stringify({
            replyToken,
            messages: [
                {
                    type: 'text',
                    text: replyText
                }
            ]
        })
    });
}
