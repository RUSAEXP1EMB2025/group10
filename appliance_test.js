//これを実行するとRemoに登録している家具の情報を取得できる
function GetDeviceId() {
    var url = REMO_ENDPOINT;
    var options = {
        "method": "get",
        "headers": { "Authorization": "Bearer " + REMO_ACCESS_TOKEN }
    };
    var reply = UrlFetchApp.fetch(url, options);
    Logger.log(reply.getContentText());
}