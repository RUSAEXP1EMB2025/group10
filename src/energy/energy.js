function calc_energy() {

    const sheet = getSheet('sensor');

    const input_energy_cost = parseInt(INPUT_ENERGY_COST, 10);  //INPUT_ENERGY_COSTは文字列として格納されているから数値に変換する.ただし10は10進数に変換という意味
    let denkidai = 0;    //今回加算する電気代
    let result_denkidai = 0; //求めた今までの合計電気代

    const row = getLastData("sensor");  //テストの時はコメントアウト
    const start = sheet.getRange(row - 1, 1).getValue(); //開始時の日時を取得
    const end = sheet.getRange(row, 1).getValue();//現在の日時を取得
    const startyear = sheet.getRange(row - 1, 3).getValue();//現在の日時を取得
    const startmonth = sheet.getRange(row - 1, 4).getValue();//現在の日時を取得
    const startday = sheet.getRange(row - 1, 5).getValue();//現在の日時を取得
    const endyear = sheet.getRange(row, 3).getValue();//現在の日時を取得
    const endmonth = sheet.getRange(row, 4).getValue();//現在の日時を取得
    const endday = sheet.getRange(row, 5).getValue();//現在の日時を取得

    let jikann = end - start; //時間差を求める

    if (startyear !== endyear || startmonth !== endmonth || startday !== endday) { // 年や月、日が違う場合を考慮
        jikann += (endyear - startyear) * 365 * 24 * 60; // 年の差を考慮
        jikann += (endmonth - startmonth) * 30 * 24 * 60; // 月の差を考慮 　一ヵ月は30日と仮定
        jikann += (endday - startday) * 24 * 60; // 日の差を考慮
    }

    //加算する電気代を求める.
    denkidai = jikann * 0.007 * 31; //使用時間×消費電力（0.007W/hと仮定）×電気単価（31円/kWと仮定）

    //今までの電気代に加算する.
    result_denkidai = denkidai + parseInt(GENZAI_DENKIDAI, 10); //前回の電気代を加算

    PropertiesService.getScriptProperties().setProperty("GENZAI_DENKIDAI", result_denkidai.toString());   //電気代をスクリプトプロパティに保存

    if (result_denkidai > input_energy_cost) {
        PropertiesService.getScriptProperties().setProperty("FORCEOFF_ENERGY", "1");
        return 1;
    } else {
        PropertiesService.getScriptProperties().setProperty("FORCEOFF_ENERGY", "0");
        return 0; //超えていないので0を返す
    }
}

//目標電気代を聞く.月1でトリガー設定する.
function HowMuchCost() {
    PropertiesService.getScriptProperties().setProperty("GENZAI_DENKIDAI", "0");
    PropertiesService.getScriptProperties().setProperty("FORCEOFF_ENERGY", "0");
    SendLineMessage("今月の目標電気代を半角数字のみで入力してください。");
}