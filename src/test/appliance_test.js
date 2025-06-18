// Remoに登録されている家電（appliances）の情報を取得し、整形してログ出力する
function logRemoAppliances() {
    const url = REMO_ENDPOINT;
    const options = {
        method: "get",
        headers: {
            Authorization: "Bearer " + REMO_ACCESS_TOKEN
        }
    };

    const response = UrlFetchApp.fetch(url, options);
    const jsonText = response.getContentText();
    const jsonData = JSON.parse(jsonText);

    // 整形してログ出力
    Logger.log(JSON.stringify(jsonData, null, 2));
}