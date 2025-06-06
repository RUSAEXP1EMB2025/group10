/*
***スクリプトプロパティから値を取り出す***

PropertiesService.getScriptProperties()：スクリプトプロパティにアクセス
getProperty("キー名")：その中の特定のキーの値を取得
*/


// Nature Remoのアクセストークン
const REMO_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("REMO_ACCESS_TOKEN");

// GoogleスプレッドシートのID
const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");

// LINE Messaging APIのアクセストークン
const LINE_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_ACCESS_TOKEN");

// Nature Remoで登録された家電のID
const APPLIANCE_ID = PropertiesService.getScriptProperties().getProperty("APPLIANCE_ID");

// ライトON用の赤外線信号ID
const LIGHT_ON_ID = PropertiesService.getScriptProperties().getProperty("LIGHT_ON_ID");

// LINE Bot：全ユーザーにメッセージをブロードキャストするエンドポイント
const LINE_BROADCAST_ENDPOINT = 'https://api.line.me/v2/bot/message/broadcast';


// LINE Bot：ユーザーに返信するエンドポイント
const LINE_REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply';

// Nature Remoの家電一覧を取得するAPIエンドポイント
const REMO_ENDPOINT = 'https://api.nature.global/1/appliances';