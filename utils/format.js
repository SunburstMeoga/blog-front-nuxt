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