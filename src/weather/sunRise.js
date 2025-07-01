function checkAndTurnOffLight() {
  console.log('日の出時刻になりました。照明の状態を確認します。');
  const lightState = getLightState(); // 照明の状態を取得

  // LIGHT_STATEが"1"（オン）の場合に消灯処理を実行
  if (lightState === '1') {
    console.log('照明がオンのため、消灯します。');
    LightOff();
    console.log('照明をオフにしました。');
  } else if (lightState === '0') {
    console.log('照明は既にオフです。処理は行いません。');
  } else {
    console.log('照明の状態が取得できませんでした。');
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
