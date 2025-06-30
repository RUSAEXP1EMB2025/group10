function LightOn() {
    const url = `https://api.nature.global/1/signals/${LIGHT_ON_ID}/send`;  //APIの送信先のurl(ライトオン)

    //UrlFetchApp.fetch()に渡す設定
    const options = {
        method: "post", //POSTメソッド使用
        headers: {
            Authorization: "Bearer " + REMO_ACCESS_TOKEN    //LINEサーバへの認証情報
        }
    };

    // 状態をオンにしておく
    PropertiesService.getScriptProperties().setProperty("LIGHT_STATE", "1");

    UrlFetchApp.fetch(url, options);
}

function LightOff() {
    const url = `https://api.nature.global/1/signals/${LIGHT_OFF_ID}/send`;  //APIの送信先のurl(ライトオン)

    //UrlFetchApp.fetch()に渡す設定
    const options = {
        method: "post", //POSTメソッド使用
        headers: {
            Authorization: "Bearer " + REMO_ACCESS_TOKEN    //LINEサーバへの認証情報
        }
    };

    // 状態をオフにしておく
    PropertiesService.getScriptProperties().setProperty("LIGHT_STATE", "0");

    UrlFetchApp.fetch(url, options);
}