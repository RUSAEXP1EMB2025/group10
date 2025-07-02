//ねんと月と日のずれを計算


function calc_energy() {

    const sheet = getSheet('sensor');

    // TEST
    // const row = getLastData("sensor");
    // const now = new Date();
    // const hour = now.getHours();
    // const minute = now.getMinutes();
    // const timeStr = hour*60 + minute; // 時間を分に変換

    // getSheet('sensor').getRange(row-1, 1, 1, 2).setValues([[timeStr, "ON"]]);

    // const now1 = new Date();
    // const hour1 = now1.getHours();
    // const minute1 = now1.getMinutes();
    // const timeStr1 = hour1*60 + 10 + minute1;

    // getSheet('sensor').getRange(row, 1, 1, 2).setValues([[timeStr1, "OFF"]]);

    // console.log("開始時間: " + timeStr + "あ");
    // console.log("終了時間: " + timeStr1 + "あ");
    // TEST終了

    const input_energy_cost = parseInt(INPUT_ENERGY_COST, 10);  //INPUT_ENERGY_COSTは文字列として格納されているから数値に変換する.ただし10は10進数に変換という意味
    let denkidai = 0;    //今回加算する電気代
    let result_denkidai = 0; //求めた今までの合計電気代

    /*
    calc_energy()はオフされたら呼び出されるのでシートの最終行は常にオフです.
    従って、getLastDataでその時点での最終行(row)を取得しているのでstartは一つ上の行(row-1)で、endは最終行(row)になります.
    */

    const row = getLastData("sensor");  //テストの時はコメントアウト
    const start = sheet.getRange(row - 1, 1).getValue(); //開始時の日時を取得
    const end = sheet.getRange(row, 1).getValue();//現在の日時を取得
    const startyear = sheet.getRange(row - 1, 3).getValue();//現在の日時を取得
    const startmonth = sheet.getRange(row - 1, 4).getValue();//現在の日時を取得
    const startday = sheet.getRange(row - 1, 5).getValue();//現在の日時を取得
    const endyear = sheet.getRange(row, 3).getValue();//現在の日時を取得
    const endmonth = sheet.getRange(row, 4).getValue();//現在の日時を取得
    const endday = sheet.getRange(row, 5).getValue();//現在の日時を取得
    // console.log("開始時間: " + start + "あ");
    // console.log("終了時間: " + end + "あ");

    let jikann = end - start; //時間差を求める

    // if (jikann < 0) {
    //     jikann = 1440-end+start; //時間差が負の値になったら絶対値に変換
    // }

    // if(endyear !== startyear ) {
    //     endyear - startyear; //年が違う場合は年の差を求める
    // }
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


    // console.log("時間: " + jikann + "あ");
    // console.log("合計電気代: " + result_denkidai + "円");


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
    SendLineMessage("今月の目標電気代を半角数字のみで入力してください。変更は出来ません。");
}

