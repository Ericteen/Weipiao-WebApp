'use strict'
let fs = require('fs');

let dealFn = {
    /**
     * [通过Promise写入数据]
     * @param  {String} file [file name]
     * @param  {Object} obj  [wrote data(object)]
     * @return {Object}      [Promise Object]
     */
    writeFileData: (file, obj) => {
        let promise = new Promise((resolve, reject) => {
            obj = JSON.stringify(obj);
            fs.writeFile("./database/" + file, obj, function(err) {
                if (err) {
                    reject("fail " + err)
                } else {
                    resolve("write success!");
                }
            });
        })
        return promise;
    },

    /**
     * [the stored data will be loaded by Promise]
     * @param  {String} file [file name]
     * @return {Object}      [Promise Object]
     */
    readFileData: (file) => {
        let promise = new Promise((resolve, reject) => {
            fs.readFile("./database/" + file, "utf-8", (err, data) => {
                if (err) {
                    console.log(err);
                    reject("read filedata error!");
                } else {
                    data = JSON.parse(data);
                    resolve(data);
                }
            })
        });
        return promise;
    }
}

module.exports = dealFn;
