function zaimOneDay() {
    let service = getOAuthService();
    if (service.hasAccess()) {
        const in_ex = parseInt(INPUT_EXPENSE, 10);  // 目標支出額を整数に変換
        let expense = parseInt(EXPENSE, 10);  // EXPENSEを整数に変換
        let yes_ex = 0;    // 取得した支出額を格納する変数

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
        let url = ZAIM_ENDPOINT + '?date=' + encodeURIComponent(dateStr);   // 日付をクエリとして追加。encodeURIComponent()でURLで使えるようにする

        // リクエストオプションのベース
        const request = {
            url: url,
            method: 'get',
        };

        /*
        OAuth1ではhttpリクエストに署名を追加して送る必要がある。
        const signedRequest = service.signRequest(request);で、上で定義したrequestに署名を追加する。
        */

        // serviceでOAuth署名付きにする
        const signedRequest = service.signRequest(request);

        // 実際にリクエストを送信（UrlFetchApp.fetchで）
        const response = UrlFetchApp.fetch(signedRequest.url, signedRequest);
        const result = JSON.parse(response.getContentText());

        /************* ここから支出額をシートに書き込み *************/

        /************* ここから支出額計算 *************/

        expense += yes_ex;  // 今までの支出額に最新の支出額を足す.

        PropertiesService.getScriptProperties().setProperty("EXPENSE", expense.toString());   //電気代をスクリプトプロパティに保存

    } else {
        const authorizationUrl = service.authorize();
        Logger.log('Open the following URL and re-run the script: %s', authorizationUrl);
    }
}