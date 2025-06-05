function LightSet() {
    const url = `https://api.nature.global/1/signals/${LIGHT_ON_ID}/send`;
    const options = {
        method: "post",
        headers: {
            Authorization: "Bearer " + REMO_ACCESS_TOKEN
        }
    };

    UrlFetchApp.fetch(url, options);
}