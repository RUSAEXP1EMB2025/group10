// 取得する場所の緯度と経度（大阪府茨木市）
const LATITUDE_OSAKA = '34.8235';
const LONGITUDE_OSAKA = '135.5710';

function getTime() {
  try {
    const properties = PropertiesService.getScriptProperties();
    const weatherApiKey = properties.getProperty('WEATHER_API_KEY');

    if (!weatherApiKey) {
      console.error('APIキーが設定されていません。スクリプトプロパティに「WEATHER_API_KEY」を設定してください。');
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE_OSAKA}&lon=${LONGITUDE_OSAKA}&appid=${weatherApiKey}&units=metric&lang=ja`;
    const response = UrlFetchApp.fetch(url);
    const json = JSON.parse(response.getContentText());

    const sunriseTimestamp = json.sys.sunrise; // 日の出のUnixタイムスタンプ(UTC)
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    
    // 'HH:mm'形式で日本のタイムゾーンの時刻をフォーマット
    const sunriseTime = Utilities.formatDate(sunriseDate, 'Asia/Tokyo', 'HH:mm');
    properties.setProperty('SUNRISE_TIME', sunriseTime);
    console.log(`日の出時刻を '${sunriseTime}' として保存しました。`);

    // 既存の消灯チェックトリガーがあれば削除（重複実行を防ぐため）
    const triggers = ScriptApp.getProjectTriggers();
    for (const trigger of triggers) {
      if (trigger.getHandlerFunction() === 'handleSunriseActions') {
        ScriptApp.deleteTrigger(trigger);
        console.log('古い消灯チェックトリガーを削除しました。');
      }
    }

    // 新しい日の出時刻で消灯チェックのトリガーを作成
    ScriptApp.newTrigger('handleSunriseActions')
      .timeBased()
      .at(sunriseDate) // 取得した日の出時刻に実行
      .create();
      
    console.log(`消灯チェックのトリガーを ${Utilities.formatDate(sunriseDate, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss')} に設定しました。`);

  } catch (e) {
    console.error(`日の出時刻の取得またはトリガー設定中にエラーが発生しました: ${e}`);
  }
}

function getWeather() {
  try {
    const properties = PropertiesService.getScriptProperties();
    const weatherApiKey = properties.getProperty('WEATHER_API_KEY');

    if (!weatherApiKey) {
      console.error('APIキーが設定されていません。');
      return null;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE_OSAKA}&lon=${LONGITUDE_OSAKA}&appid=${weatherApiKey}&units=metric&lang=en`;
    const response = UrlFetchApp.fetch(url);
    const json = JSON.parse(response.getContentText());

    const weatherDescription = json.weather[0].description;
    console.log(`現在の天気: ${weatherDescription}`);
    return weatherDescription;

  } catch (e) {
    console.error(`天気情報の取得中にエラーが発生しました: ${e}`);
    return null;
  }
}
