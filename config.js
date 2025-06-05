const REMO_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("REMO_ACCESS_TOKEN");
const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
const LINE_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_ACCESS_TOKEN");
const LINE_BROADCAST_ENDPOINT = 'https://api.line.me/v2/bot/message/broadcast';
const LINE_REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply';