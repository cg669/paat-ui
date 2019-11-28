const fs = require('fs-extra')
const path = require('path')
function replaceFile(filePath, reg, replaceStr = '') {
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return err;
        }
        let str = data.toString();
        str = str.replace(reg, replaceStr);
        fs.writeFile(filePath, str, function (err) {
            if (err) return err;
        })
    })
}

// function changePath(filePath) {

//     const targetPath = `${filePath.replace(/index\.css/g, '')}styles/`
//     // console.log(path.resolve(filePath), 'filePath', targetPath)
//     fs.move(filePath, targetPath, { overwrite: true }, function (err) {
//         if (err) {
//             console.log(err, '22!')
//             return err;
//         }
//         console.log('success!')
//     })
// }

function repair(src, reg1, reg2, replaceStr = '') {
    fs.readdir(src, function (err, files) {
        if (err) {
            return err;
        }
        if (files.length !== 0) {
            files.forEach((item) => {
                let path = src + item;
                //判断文件的状态，用于区分文件名/文件夹
                fs.stat(path, function (err, status) {
                    if (err) {
                        return err;
                    }
                    let isFile = status.isFile();//是文件
                    let isDir = status.isDirectory();//是文件夹
                    if (isFile) {
                        if (reg1 && item.match(reg1)) {
                            replaceFile(path, reg2, replaceStr);
                        }
                    } else if (isDir && !path.match(/styles/)) {
                        repair(`${path}/`, reg1, reg2, replaceStr)
                    }
                });
            });
        }
    })
}


//  因为node-sass编译后并没有改变引入路径 所以写个脚本修复下
repair('./es6/', /\.js(x?)$/, /index\.scss/, 'index.css');
repair('./lib/', /\.js(x?)$/, /require\(\"\.\/index\.scss\"\)\;/);



