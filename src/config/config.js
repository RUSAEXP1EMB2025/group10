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

// ライトOFF用の赤外線信号ID
const LIGHT_OFF_ID = PropertiesService.getScriptProperties().getProperty("LIGHT_OFF_ID");

// 今月の目標電気代.設定されていなかったら「0」という文字列が入る.
const INPUT_ENERGY_COST = PropertiesService.getScriptProperties().getProperty("INPUT_ENERGY_COST") || "0";

// 今月の目標支出額.設定されていなかったら「0」という文字列が入る.
const INPUT_EXPENSE = PropertiesService.getScriptProperties().getProperty("INPUT_EXPENSE") || "0";

// ユーザが電気代設定と支出額設定のどちらを選んだか.設定されていなかったら「0」という文字列が入る.（0：電気代設定, 1：支出額設定）
const WHICHSTATE = PropertiesService.getScriptProperties().getProperty("WHICHSTATE") || "0";

// zaimのAPIのユーザーID
const CONSUMER_ID = PropertiesService.getScriptProperties().getProperty("CONSUMER_ID");

// zaimのAPIのパスワード
const CONSUMER_SECRET = PropertiesService.getScriptProperties().getProperty("CONSUMER_SECRET");

//オフする度にこのGENZAI_DENKIDAIに加算していく
const GENZAI_DENKIDAI = PropertiesService.getScriptProperties().getProperty("GENZAI_DENKIDAI") || "0";
// weather API key
const WEATHER_API_KEY = PropertiesService.getScriptProperties().getProperty("WEATHER_API_KEY");

// LINE Bot：全ユーザーにメッセージをブロードキャストするエンドポイント
const LINE_BROADCAST_ENDPOINT = 'https://api.line.me/v2/bot/message/broadcast';

// LINE Bot：ユーザーに返信するエンドポイント
const LINE_REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply';

// Nature Remoの家電一覧を取得するAPIエンドポイント
const REMO_ENDPOINT = 'https://api.nature.global/1/appliances';