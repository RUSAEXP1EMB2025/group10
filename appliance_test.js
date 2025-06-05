function GetDeviceId() {
    var url = REMO_ENDPOINT;
    var options = {
        "method": "get",
        "headers": { "Authorization": "Bearer " + REMO_ACCESS_TOKEN }
    };
    var reply = UrlFetchApp.fetch(url, options);
    Logger.log(reply.getContentText());
}
