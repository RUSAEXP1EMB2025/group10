/* 
実行時の1日前の支出額を取得する関数
zaimから取得した前日のデータをシートに記録する.
*/

function zaimOneDay() {
    let service = getOAuthService();
    if (service.hasAccess()) {
        /************* ここから支出額取得 *************/

        /*
        日付を指定された形式に従って、文字列に変換.
        <Utilities.formatDate(日付,タイムゾーン,フォーマット)>
        ・new Date()：その時点での時間を取得
        ・JST：日本時間で処理
        ・yyyy-MM-dd：この形式に整形
        */
        let date = new Date();
        date.setDate(date.getDate() - 1); // 昨日のデータを取得 
        let dateStr = Utilities.formatDate(date, 'JST', 'yyyy-MM-dd');

        // 日付(範囲を1日にする)をクエリとして追加。encodeURIComponent()でURLで使えるようにする
        let url = ZAIM_ENDPOINT + '?start_date=' + encodeURIComponent(dateStr) + '&end_date=' + encodeURIComponent(dateStr);

        // zaimにリクエストを送って、レスポンスをresponseに格納
        const response = service.fetch(url);

        // JSON形式をオブジェクトに変換する
        // getContentText()でレスポンスの中身を文字列として取り出してからオブジェクトに変換
        const result = JSON.parse(response.getContentText());

        /************* ここから支出額をシートに書き込み *************/

        // writeZaimDataToSheetの引数は配列だから、resultだけだとオブジェクトなのでだめ
        setZaimData(result.money);

        /************* ここから支出額と目標の比較 *************/

        let isOver = calc_expense();    // ここでEXPENSEも更新される

        if (isOver === 1) {
            PropertiesService.getScriptProperties().setProperty("FORCEOFF_EXPENSE", "1");
            SendLineMessage("目標支出額を超えました。点灯操作が停止しました。");
        } else {
            PropertiesService.getScriptProperties().setProperty("FORCEOFF_EXPENSE", "0");
        }

    } else {
        const authorizationUrl = service.authorize();
        Logger.log('Open the following URL and re-run the script: %s', authorizationUrl);
    }
}

// 支出額を計算して、目標を超えたら1、超えなかったら0を返す関数
function calc_expense() {

    const in_ex = parseInt(INPUT_EXPENSE, 10);  // 目標支出額を整数に変換

    const sheet = getSheet("zaim");
    const data = sheet.getRange(1, 2, sheet.getLastRow(), 1).getValues(); // 2列目全体(支出額が格納されている列)を取得
    let sum = 0;    // 支出額を格納する変数

    // 2列目を合計する
    data.forEach(row => {
        const value = parseInt(row[0]);
        if (!isNaN(value)) {    // valueが数値の時にのみ加算
            sum += value;
        }
    });

    PropertiesService.getScriptProperties().setProperty("EXPENSE", sum.toString());   //支出額をスクリプトプロパティに保存

    // 目標を超えたら1、超えていなかったら0を返す
    if (sum > in_ex) {
        return 1;
    } else {
        return 0;
    }
}

// Zaimのデータをリセットする関数
function clear_zaim() {
    const sheet = getSheet('zaim');
    sheet.clearContents(); // シート全体を削除

    PropertiesService.getScriptProperties().setProperty("EXPENSE", "0");    // 合計をリセット
    PropertiesService.getScriptProperties().setProperty("FORCEOFF_EXPENSE", "0");

    SendLineMessage("今月の目標支出額を半角数字のみで入力してください。");
}