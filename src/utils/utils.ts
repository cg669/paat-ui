//  获取验证码字符
export function getRndCode() {
    const codes =
        '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const d = []
    for (let i = 0; i < 4; i++) {
        // tslint:disable-next-line:radix
        d.push(codes.substr(Math.ceil(Math.random() * 61) - 1, 1))
    }
    return d
}
//  随机
export function getRandom(max: number, min: number, num = 0): number[] {
    // tslint:disable-next-line:no-bitwise
    const asciiNum = ~~(Math.random() * (max - min + 1) + min)
    if (!Boolean(num)) {
        return [asciiNum]
    }
    const arr = []
    for (let i = 0; i < num; i++) {
        arr.push(...getRandom(max, min))
    }
    return arr
}