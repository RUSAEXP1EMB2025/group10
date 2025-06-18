function LightOn() {
    const url = `https://api.nature.global/1/signals/${LIGHT_ON_ID}/send`;  //APIの送信先のurl(ライトオン)

    //UrlFetchApp.fetch()に渡す設定
    const options = {
        method: "post", //POSTメソッド使用
        headers: {
            Authorization: "Bearer " + REMO_ACCESS_TOKEN    //LINEサーバへの認証情報
        }
    };

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

    UrlFetchApp.fetch(url, options);
}

function LightState() {
    const devices = getNatureRemoData("devices");   //登録している家具のデータがJSON形式でdevicesに入る

    /*
    result = Array.find( func() ) では配列Arrayの要素を頭から走査していって,各要素に対して,引数のfuncを呼び出す.そして、最初にtrueになった要素をresultに代入する.

    アロー演算子=>は、関数である.
    device => device.type === "LIGHT"を書き換えると以下のようになる.
    
    function func(device) {
        return device.type === "LIGHT";
    }

    つまり以下の一行はdevice.typeが"LIGHT"の要素を探していて、最初に見つかったのをdevideに代入している.
    */
    const find_device = devices.find(device => device.type === "LIGHT");

    const state = find_device.light.state;  //"state"の項目をstateに代入

    return state.power; // "on" または "off"を返す
}