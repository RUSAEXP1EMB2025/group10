// light.js

const REMO_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("REMO_ACCESS_TOKEN");
const APPLIANCE_ID = 'b1dff0d4-377b-4152-8eb1-362f2149de28';

/**
 * 現在のライトの状態を取得
 * 'on' または 'off'を返却
 */
function getLightState() {
    const url = 'https://api.nature.global/1/appliances';
    const response = UrlFetchApp.fetch(url, {
        method: 'get',
        headers: { Authorization: `Bearer ${REMO_ACCESS_TOKEN}` }
    });

    const appliances = JSON.parse(response.getContentText());
    const target = appliances.find(a => a.id === APPLIANCE_ID);
    return target?.light?.state?.power || 'unknown';
}

/**
 * ライトの状態をトグル（ON↔OFF）する
 * 実行したボタン名を返却
 */
function toggleLight() {
    const current = getLightState();
    const button = current === 'on' ? 'onoff' : 'on'; // OFFのときはONを、ONのときはトグルボタン

    const url = `https://api.nature.global/1/appliances/${APPLIANCE_ID}/light`;
    UrlFetchApp.fetch(url, {
        method: 'post',
        headers: { Authorization: `Bearer ${REMO_ACCESS_TOKEN}` },
        payload: { button }
    });

    return button;
}
