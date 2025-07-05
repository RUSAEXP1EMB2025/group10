function setSensorData(state) {

    const row = getLastData("sensor") + 1;   // 次に書き込む行数

    const now = new Date();

    const hour = now.getHours();

    const minute = now.getMinutes();

    const timeStr = String(hour * 60 + minute);


    const year = now.getFullYear();      // 年
    const month = now.getMonth() + 1;    // 月（0始まりなので+1）
    const day = now.getDate();           // 日

    // ↑追加、修正ポイント　　　　　　　　　　　　　　　　　　↓ここも
    getSheet('sensor').getRange(row, 1, 1, 5).setValues([[timeStr, state, year, month, day]]);//
}

//Zaimからのデータをシートに書き込む関数
function setZaimData(data) {
    let row = getLastData("zaim") + 1;

    /*
    日付」「金額」「カテゴリ」を抽出して書き込む
    forEachで、dataの各itemに対して=>以降の処理をする
    getRange(row, 1, 1, 4)は「row行目から1列目から1行分、4列目まで」という意味
    */
    data.forEach(item => {
        getSheet('zaim').getRange(row, 1, 1, 2).setValues([
            [item.date, item.amount]
        ]);
        row++;
    });
}

// Zaimのデータを全消しする関数
function clear_zaim() {
    const sheet = getSheet('zaim');
    sheet.clearContents(); // シート全体を削除

    PropertiesService.getScriptProperties().setProperty("EXPENSE", "0");    // 合計をリセット
}