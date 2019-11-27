const fs = require('fs')
function replaceFile(filePath) {
    // console.log(filePath, 'filePath')
    fs.readFile(filePath, function (err, data) {
        if (err) {
            return err;
        }
        let str = data.toString();
        str = str.replace(/index\.scss/, 'index.css');
        fs.writeFile(filePath, str, function (err) {
            if (err) return err;
        })
    })
}

function repair(src) {
    // console.log(src, 'src')
    fs.readdir(src, function (err, files) {
        if (err) {
            return err;
        }
        if (files.length != 0) {
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
                        if (item.match(/\.js(x?)$/)) {
                            replaceFile(path);
                        }
                    }
                    if (isDir) {
                        // console.log(path, isDir)
                        repair(`${path}/`)
                    }
                });
            });
        }
    })
}
//  因为node-sass编译后并没有改变引入路径 所以写个脚本修复下
repair('./lib/');
repair('./es6/');