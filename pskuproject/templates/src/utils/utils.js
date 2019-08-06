function selectedId(pskuArray) {
    let arrLen = pskuArray.length
    let finalArr = []
    if (pskuArray !== undefined) {
        for (let i = 0; i < arrLen; i++) {
            finalArr.push(pskuArray[i]['psku_id'])
        }
    }
    return finalArr
}

export { selectedId }