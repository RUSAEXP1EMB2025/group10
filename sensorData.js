function setSensorData(state) {
    const row = getLastData("sensor") + 1;   // 次に書き込む行数

    getSheet('sensor').getRange(row, 1, 1, 2).setValues([[new Date(), state]]);
}