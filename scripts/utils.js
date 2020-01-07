const chalk = require('chalk')

const delDirs = require('./build').delDirs



function clear() {
    return new Promise(resolve => {
        process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H', async (err) => {
            if (err) {
                errorHandler()
            } else {
                resolve()
            }
        })
    })
}

async function errorHandler(msg) {
    console.log(chalk.red(msg))
    await delDirs()
    process.exit(0)
}

module.exports = {
    errorHandler,
    clear
}