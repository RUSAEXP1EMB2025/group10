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
    getSheet('sensor').getRange(row, 1, 1, 5).setValues([[timeStr, state ,year, month, day]]);//
}