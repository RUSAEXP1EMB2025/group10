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