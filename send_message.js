const LINE_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_ACCESS_TOKEN");

const LINE_MESSAGE_ENDPOINT = 'https://api.line.me/v2/bot/message/broadcast';

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

    UrlFetchApp.fetch(LINE_MESSAGE_ENDPOINT, options);
}

function main() {
    const message = "こんにちは";
    LineMessage(message);
}