const fs = require('fs-extra')
const chalk = require('chalk')
const ora = require('ora')
const errorHandler = require('./utils').errorHandler
// const ProgressBar = require('./progress');
// const pb = new ProgressBar('修复进度', 50)

// let num = 0

// let total = 0


const reg1 = /\.js(x?)$/
const reg2 = /index\.scss/
const replaceStr = 'index.css'


const spinner = ora({
    spinner: "moon",
    "interval": 120,
    "frames": [
        "▹▹▹▹▹",
        "▸▹▹▹▹",
        "▹▸▹▹▹",
        "▹▹▸▹▹",
        "▹▹▹▸▹",
        "▹▹▹▹▸"
    ]
})

function replaceFile(filePath, reg, replaceStr = '') {
    return new Promise((resolve, reject) => {
        spinner.text = chalk.green(`${filePath}正在修复\n`)
        fs.readFile(filePath, function (err, data) {
            if (err) {
                return err;
            }
            let str = data.toString();
            str = str.replace(reg, replaceStr);
            fs.writeFile(filePath, str, function (err) {
                if (err) {
                    errorHandler(`${filePath}文件修复失败`)
                } else {
                    // // console.log('...')
                    spinner.text = chalk.green(`${filePath}已修复\n`)
                    // spinner.info(chalk.green(`${filePath}已修复\n`))
                    resolve()
                }
            })
        })
    })
}

function isFile(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, async (err, status) => {
            if (err) {
                errorHandler(`读取${path}文件失败`)
            }
            const isFile = status.isFile();//是文件
            const isDir = status.isDirectory();//是文件夹
            if (isFile) {
                if (reg1 && path.match(reg1)) {
                    await replaceFile(path, reg2, replaceStr)
                }
            } else if (isDir) {
                await repair(`${path}/`)
            }
            resolve()
        })
    })
}

function repair(src) {
    return new Promise((resolve, reject) => {
        // spinner.info(`正在修复：${src}`)
        fs.readdir(src, async (err, files) => {
            if (err) {
                errorHandler(`读取${src}文件夹失败`)
            }
            if (files && files.length > 0) {
                await Promise.all(
                    files.map((item) => isFile(src + item))
                )
            }
            resolve()
        })
    })
}

module.exports = async function () {
    // console.log(chalk.cyan(`\n开始执行修复js文件引入css脚本\n`))
    spinner.start(chalk.cyan(`执行修复css引入路径\n`))
    // 初始化一个进度条长度为 50 的 ProgressBar 实例
    // console.log(chalk.cyan(`这个只是临时方案\n`))
    //  因为node-sass编译后并没有改变引入路径 所以写个脚本修复下
    await Promise.all([
        repair('./es6/'),
        repair('./lib/'),
    ])
    spinner.succeed(chalk.green(`修复js文件引入css路径脚本执行完毕\n`))
    // console.log(chalk.green(`\n修复js文件引入css脚本完毕\n`))
}
