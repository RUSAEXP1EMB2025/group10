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

// ライトの状態 (0でオフ、1でオン)
const LIGHT_STATE = PropertiesService.getScriptProperties().getProperty("LIGHT_STATE") || "0";

// 今月の目標電気代.設定されていなかったら「0」という文字列が入る.
const INPUT_ENERGY_COST = PropertiesService.getScriptProperties().getProperty("INPUT_ENERGY_COST") || "0";

// オフする度にこのGENZAI_DENKIDAIに加算していく
const GENZAI_DENKIDAI = PropertiesService.getScriptProperties().getProperty("GENZAI_DENKIDAI") || "0";

// 今月の目標支出額.設定されていなかったら「0」という文字列が入る.
const INPUT_EXPENSE = PropertiesService.getScriptProperties().getProperty("INPUT_EXPENSE") || "0";

// シートからの合計額をここに格納
const EXPENSE = PropertiesService.getScriptProperties().getProperty("EXPENSE") || "0";

// ユーザが電気代設定と支出額設定のどちらを選んだか.設定されていなかったら「0」という文字列が入る.（0：電気代設定, 1：支出額設定）
const WHICHSTATE = PropertiesService.getScriptProperties().getProperty("WHICHSTATE") || "0";

// zaimのAPIのユーザーID
const CONSUMER_KEY = PropertiesService.getScriptProperties().getProperty("CONSUMER_KEY");

// zaimのAPIのパスワード
const CONSUMER_SECRET = PropertiesService.getScriptProperties().getProperty("CONSUMER_SECRET");

// weather API key
const WEATHER_API_KEY = PropertiesService.getScriptProperties().getProperty("WEATHER_API_KEY");

// 目標電気代を超えたらこれを1にする.1の時はオン出来ないようにする.
const FORCEOFF_ENERGY = PropertiesService.getScriptProperties().getProperty("FORCEOFF_ENERGY") || "0";

// 目標支出額を超えたらこれを1にする.1の時はオン出来ないようにする.
const FORCEOFF_EXPENSE = PropertiesService.getScriptProperties().getProperty("FORCEOFF_EXPENSE") || "0";

// Google Maps Geocoding API
const D_APIKEY = PropertiesService.getScriptProperties().getProperty("D_APIKEY");

// どこの日の出時刻を取得するか（緯度）（デフォルトで大阪府茨木市）
const LATITUDE = PropertiesService.getScriptProperties().getProperty("LATITUDE") || "34.8235";

// どこの日の出時刻を取得するか（経度）（デフォルトで大阪府茨木市）
const LONGITUDE = PropertiesService.getScriptProperties().getProperty("LONGITUDE") || "135.5710";

// 日の出時刻（デフォルトで朝の4時）
const SUNRISE_TIME = PropertiesService.getScriptProperties().getProperty("SUNRISE_TIME") || "04:00";

// 詳細設定のフラグ（1の時に詳細設定）
const SETTING = PropertiesService.getScriptProperties().getProperty("SETTING") || "0";

// 自宅の住所入力のフラグ
const ISLOCATION = PropertiesService.getScriptProperties().getProperty("ISLOCATION") || "0";

// REMOのトークン設定のフラグ
const ISTOKEN = PropertiesService.getScriptProperties().getProperty("ISTOKEN") || "0";

// LIGHT_ON_ID設定のフラグ
const IS_ONID = PropertiesService.getScriptProperties().getProperty("IS_ONID") || "0";

// LIGHT_OFF_ID設定のフラグ
const IS_OFFID = PropertiesService.getScriptProperties().getProperty("IS_OFFID") || "0";

// LINE Bot：全ユーザーにメッセージをブロードキャストするエンドポイント
const LINE_BROADCAST_ENDPOINT = 'https://api.line.me/v2/bot/message/broadcast';

// LINE Bot：ユーザーに返信するエンドポイント
const LINE_REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply';

// Nature Remoの家電一覧を取得するAPIエンドポイント
const REMO_ENDPOINT = 'https://api.nature.global/1/appliances';

//zaimのエンドポイント
const ZAIM_ENDPOINT = 'https://api.zaim.net/v2/home/money';