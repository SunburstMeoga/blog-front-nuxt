export function addressFilter(value) {
    if (value === undefined) return
    let arr = value.split('')
    let targetStr
    let targetArr = []
    arr.map((item, index) => {
        if (index <= 6 || index >= arr.length - 7) {
            targetArr.push(item)
        }
    })
    targetArr.splice(7, 0, '...')
    targetStr = targetArr.join('')
    return targetStr
}

export function getLocalTime(utcDateTimeString) {
    // 將日期時間字串轉換為 Date 物件
    const utcDateTime = new Date(utcDateTimeString);

    // 取得本地時間的字串表示
    const localDateTimeString = utcDateTime.toLocaleString();

    return localDateTimeString;
}