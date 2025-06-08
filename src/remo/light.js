function LightSet() {
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

/*
LightSetは一回呼び出せば前の状態を反転させる(オン→オフ,オフ→オン).
これだと状態の判別が出来ないからオンとオフそれぞれ専用の関数を作りたい.
自分の家のリモコンにはトリガー型のボタンしか無く、それぞれの赤外線idが得られないので、オンオフそれぞれのボタンがあるリモコンを持ってる人にお願いしたい.

function LightOn()       //ライトをつける関数

function LightOff()      //ライトを消す関数

function LightState()    //ライトの状態取得する関数

*/