// 照明の情報を取得する関数
function getNatureRemoData(endpoint) {
    // ヘッダーの定義
    const headers = {
        "Content-Type": "application/json;",
        'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
    };

    // UrlFetchApp()に渡すオブジェクト定義
    const options = {
        "method": "get",    //getメソッド
        "headers": headers, //ヘッダーは上で定義したもの
    };

    // UrlFetchApp()は指定されたエンドポイントへHTTPリクエストを送る関数
    // データはJSON形式で取得できるため、それをJSON.parseでオブジェクトにして、それを返り値とする.
    return JSON.parse(UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint, options));
}

function getLastTime() {
  const deviceData = getNatureRemoData("devices"); // data取得

  const motion = deviceData[0].newest_events.mo;

  return motion.created_at; // 文字列 "2025-06-25T04:12:02Z" (例)を返す
}

function timeConversion() {
  const world_time = getLastTime();
  const utcTime = new Date(world_time); // 日本時間に変換

  // 時:分:秒だけを取り出す
  const timeString = utcTime.toLocaleTimeString("ja-JP", {
    hour12: false,             // 24時間制
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return timeString;
}