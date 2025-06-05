function LineMessage(message) {
    const header = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN
    }

    const payload = {
        "messages": [
            {
                "type": "text",
                "text": message
            }
        ]
    };

    const options = {
        'method': 'post',
        'headers': header,
        'payload': JSON.stringify(payload)
    };

    UrlFetchApp.fetch(LINE_BROADCAST_ENDPOINT, options);
}

//テスト用のmain
function main() {
    const message = "こんにちは";
    LineMessage(message);
}