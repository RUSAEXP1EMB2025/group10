//timeConversion()で最後にセンサが反応した時間を取得
function controlLightByMotion() {
  const worldTime = getLastTime();         // UTC文字列
  const motionDate = new Date(worldTime);  // Dateオブジェクト（UTC）
  const now = new Date();                  // 現在の日本時間

  const diffInSeconds = (now - motionDate) / 1000;

  // 一分以内だったら点灯
  if (diffInSeconds >= 0 && diffInSeconds <= 60) {
    LightOn();
    SendLineMessage("人感センサに反応があったのでライトをつけました。");
  }
}
//その時刻と関数起動時の時刻を比較して、x分以内に反応していたらライトオン

//ついたらラインにお知らせ