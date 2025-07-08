// この関数が日の出時刻に実行される
function handleSunriseActions() {
  const weather = getWeather(); // OpenWeatherMapから現在の天気を英語で取得

  // 天気が「clear sky」の場合のみ、消灯処理を実行
  if (weather === 'clear sky') {
    checkAndTurnOffLight(); // 照明がオンなら消灯する関数を呼び出し
  }
}

// この関数はhandleSunriseActions()で呼ばれ、ライトの状態をチェックしたうえで操作をする
function checkAndTurnOffLight() {

  // LIGHT_STATEが"1"（オン）の場合に消灯処理を実行
  if (LIGHT_STATE === '1') {
    LightOff();
    SendLineMessage("日の出時点で照明が点灯していたので消灯しました。");
  }
}

function triggers() {
  const allTriggers = ScriptApp.getProjectTriggers();
  for (const trigger of allTriggers) {
    ScriptApp.deleteTrigger(trigger);
  }
  console.log('既存のトリガーをすべて削除しました。');

  // getTimeを【毎日0時〜1時の間】に実行するトリガーを新規作成
  ScriptApp.newTrigger('getTime')
    .timeBased()
    .atHour(0)
    .everyDays(1)
    .create();

  console.log('毎日の日の出時刻取得トリガーの設定が完了しました。');
}