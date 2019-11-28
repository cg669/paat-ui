const rimraf = require('rimraf')

function del(dir) {
    rimraf(dir, function (err) {
        if (err) {
            console.log(err);
        }
    });
}




del('lib')
del('es6')
del('typings')
del('dist')

