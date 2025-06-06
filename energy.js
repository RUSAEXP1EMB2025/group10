function calc_energy() {

    const input_energy_cost = parseInt(INPUT_ENERGY_COST, 10);  //INPUT_ENERGY_COSTは文字列として格納されているから数値に変換する.ただし10は10進数に変換という意味
    let tmp_energy_cost = 0;    //今の時点での電気代

    /*
        1.ライトをオフしたらその時点での電気代を計算
        2.月初に入力した設定金額(引数のinput_energy_cost)を超えていないなら0を返す
        3.input_energy_costを超えたら1を返す
    */


    if (tmp_energy_cost > input_energy_cost) {
        return 1;
    } else {
        return 0;
    }
}

//目標電気代を聞く.月1でトリガー設定する.
function HowMuchCost() {
    SendLineMessage("今月の目標電気代を数字のみで入力してください.変更は出来ません.");
}