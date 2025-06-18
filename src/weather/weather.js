//日の出時刻になったもライトがついていたらライト消す(状態の判定する関数必要 /src/remo/light.js)

//雨or曇りだったらつけたまま

//状態を格納をする変数をLIGHT_STATE(1,0)1:ついてる

//light_state() === 1
const SHEET_NAME = '天気';

// 取得する場所の緯度と経度（大阪府茨木市）
const LATITUDE = '34.8235';  // 緯度
const LONGITUDE = '135.5710'; // 経度

function recordTodaysWeather() {
    try {
        // OpenWeatherMap APIのURLを構築
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${WEATHER_API_KEY}&units=metric&lang=ja`;

        // APIにリクエストを送信してレスポンスを取得
        const response = UrlFetchApp.fetch(url);
        const json = JSON.parse(response.getContentText());

        // 取得したJSONデータから必要な情報を抽出
        const timestamp = new Date(); // 取得日時
        const weatherDescription = json.weather[0].description; // 天気の詳細（例：晴れ、曇り）
        const sunriseTimestamp = json.sys.sunrise; // 日の出のUnixタイムスタンプ(UTC)
        const sunriseDate = new Date(sunriseTimestamp * 1000);
        // Utilities.formatDateを使ってタイムゾーンを'Asia/Tokyo'に指定し、'HH:mm'形式でフォーマット
        const sunriseTime = Utilities.formatDate(sunriseDate, 'Asia/Tokyo', 'HH:mm');

        // スプレッドシートの操作
        const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = spreadsheet.getSheetByName(SHEET_NAME);

        // シートが存在しない場合は新しく作成
        if (!sheet) {
            sheet = spreadsheet.insertSheet(SHEET_NAME);
            // ★変更点：ヘッダー行に「日の出時刻」を追加
            const header = ['取得日時', '天気', '日の出時刻'];
            sheet.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold');
        }

        // 新しい行に天気情報を書き込み
        const lastRow = sheet.getLastRow();
        const newRow = [
            timestamp,
            weatherDescription,
            sunriseTime
        ];
        sheet.getRange(lastRow + 1, 1, 1, newRow.length).setValues([newRow]);

        // 列の幅を自動調整
        sheet.autoResizeColumns(1, newRow.length);

        console.log('天気情報を正常に記録しました。');

    } catch (e) {
        // エラーが発生した場合の処理
        console.error(`エラーが発生しました: ${e}`);
        // エラー内容をスプレッドシートに記録することも可能
        const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        const errorSheet = spreadsheet.getSheetByName('エラーログ') || spreadsheet.insertSheet('エラーログ');
        errorSheet.appendRow([new Date(), e.toString()]);
    }
}