//zaim用のOAuthサービスオブジェクトを作って返す関数
function getOAuthService() {
    return OAuth1.createService('Zaim')                             //OAuthのサービス作成
        .setAccessTokenUrl('https://api.zaim.net/v2/auth/access')   //アクセストークンを取得するURLを指定
        .setRequestTokenUrl('https://api.zaim.net/v2/auth/request') //リクエストトークンを取得(ユーザーにzaimを使っていいか聞く時に使用)
        .setAuthorizationUrl('https://auth.zaim.net/users/auth')    //zaimの認可画面を見せるURL
        .setConsumerKey(CONSUMER_KEY)                               //APIのID
        .setConsumerSecret(CONSUMER_SECRET)                         //APIのパスワード
        .setCallbackFunction('authCallback')                        //認証が終わったらauthCallback関数に返すと指定
        .setPropertyStore(PropertiesService.getUserProperties());   //アクセストークンをスクリプトプロパティに格納
}

//認証はここから始まる
function authorize() {
    const service = getOAuthService();    //zaim用のOAuthサービス取得
    if (!service.hasAccess()) {   //アクセストークンを持っているか確認
        const authorizationUrl = service.authorize();   //getOAuthService()で定義したzaimの認可画面を見せるURLを元に認可用URL作成
        Logger.log('Open the following URL and re-run the script: %s', authorizationUrl);   //URL表示
    } else {
        Logger.log('Already authorized');
    }
}

//authorizeで認可が終わったらこの関数に返ってくる
function authCallback(request) {
    const service = getOAuthService();
    const authorized = service.handleCallback(request); //handleCallbackで認可が成功(true)か失敗(false)かを判断

    if (authorized) {
        return HtmlService.createHtmlOutput('認証に成功しました。ページを閉じてください。');  //HtmlService.createHtmlOutput()はhtml形式のレスポンスをwebブラウザに返す
    } else {
        return HtmlService.createHtmlOutput('認証に失敗しました。');
    }
}