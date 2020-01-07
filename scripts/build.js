const rimraf = require('rimraf')
const ora = require('ora')
const shell = require('shelljs')
const chalk = require('chalk')
const clear = require('./utils').clear

const delPaths = ['lib', 'es6', 'typings', 'dist']
const shellList = [
    { execStr: 'npx tsc -p ./ --outDir es6/ -d --declarationDir typings/', successMsg: 'typescript->es6成功', failMsg: 'typescript->es6失败' },
    { execStr: 'npx babel es6 --out-dir lib', successMsg: 'es6->es5转换成功', failMsg: 'es6->es5转换失败' },
    { execStr: 'npx node-sass -r ./src/ -o es6 && npx node-sass -r ./src/ -o lib', successMsg: 'scss->css转换成功', failMsg: 'scss->css转换失败' },
]
const spinner = ora({
    frames: ['-', '+', '-'],  // 进度显示
    interval: 50,
    text: '...'
});
function del(dir) {
    return new Promise((resolve, reject) => rimraf(dir, err => {
        if (err) {
            console.log(err)
            reject(err)
            process.exit(0)
        } else {
            console.log(chalk.green(`${dir}删除成功\n`))
            resolve()
        }
    }))
}

async function delDirs() {
    return Promise.all(delPaths.map(x => del(x)))
}

function runShell({ execStr, successMsg = '', failMsg = '' }) {
    return new Promise((resolve, reject) => {
        shell.exec(execStr, (code, stdout, stderr) => {
            if (stderr) {
                spinner.fail(chalk.red(`${failMsg}:${stderr}`))
                reject(stderr)
                process.exit(0)
            }
            if (code === 0) {
                spinner.succeed(chalk.green(`${successMsg}\n`))
                resolve()
            } else {
                spinner.fail(chalk.red(`${failMsg}:${stderr}`))
                process.exit(0)
            }
        })
    })
}

async function runShellByQueue(shellList) {
    for (let value of shellList) {
        await runShell(value);
    }
}

async function Main() {
    if (!shell.exec('npm config get registry').stdout.includes('https://registry.npmjs.org/')) {
        console.log(chalk.yellow(`set npm registry to https://registry.npmjs.org/ first\n`))
        runShell({ execStr: 'npm config set registry https://registry.npmjs.org/', successMsg: '切换到npm成功' })
    }
    console.log(chalk.cyan(`\n开始删除文件\n`))
    await delDirs()
    spinner.start(chalk.cyan('开始编译\n'))
    await runShellByQueue(shellList)
    await clear()
    require('./repair')()
}

module.exports = {
    delDirs
}


try {
    Main()
} catch (err) {
    console.log(chalk.red(`编译报错：${err}`))
    process.exit(0)
}

// del('lib')
// del('es6')
// del('typings')
// del('dist')



