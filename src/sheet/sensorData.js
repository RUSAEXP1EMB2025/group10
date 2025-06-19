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
function writeZaimDataToSheet(data) {
    const row = getLastData("zaim") + 1;
    // dataが配列の場合
    // 「日付」「金額」「カテゴリ」「メモ」を抽出して書き込む
    data.forEach(item => {
        getSheet('zaim').getRange(row, 1, 1, 4).setValues([
            [item.date, item.amount, item.category, item.comment]
        ]);
        row++;
    });
}