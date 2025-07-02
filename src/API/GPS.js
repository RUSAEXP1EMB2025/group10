function convertAdress(address) {

  const encodedAddress = encodeURIComponent(address); // 住所をURLに使えるように変換
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${D_APIKEY}`;

  // リクエスト送信
  const response = UrlFetchApp.fetch(url);
  const json = JSON.parse(response.getContentText());

  if (json.status === "OK") {
    const location = json.results[0].geometry.location;
    const lat = location.lat;
    const lng = location.lng;

    // 緯度・経度をスクリプトプロパティに保存
    const props = PropertiesService.getScriptProperties();
    props.setProperty("home_lat", lat.toString());
    props.setProperty("home_lng", lng.toString());

}
}