'use strict'
let url = require('url');  
let dealFn = require('./dealfn.js');

let express = require('express')
let router = express.Router()

function sendDataFn(req, res, filename, needcity) {
    let query = url.parse(req.url, true).query,
        name = query.name || '',
        city = query.city,
        readFileName = '',
        sendData = {
            errno: 0,
            city: city,
            msg: 'ok',
            data: {}
        };
    if (needcity) {
        readFileName = city + filename;
    } else {
        readFileName = filename;
    }
    dealFn.readFileData(name + readFileName).then((data) => {
        sendData.data = data;
        res.send(JSON.stringify(sendData));
    }, (msg) => {
        sendData.errno = -1;
        sendData.msg = '暂时没有数据';
        res.send(JSON.stringify(sendData));
    })
}


router.get('/app', (req, res) => {
    res.render('index');
})

router.get('/coming', (req, res, next) => {
    let query = url.parse(req.url, true).query,
        limit = query.limit,
        offset = query.offset;
    if (limit && offset) {
        next();
    } else {
        sendDataFn(req, res, 'coming.json', false);
    }
})

router.get(/\/coming\/[\w\W]*/, (req, res) => {
    let query = url.parse(req.url, true).query,
        limit = +query.limit,
        offset = +query.offset,
        sendData = {
            errno: 0,
            total: 0,
            limit: limit,
            offset: offset,
            msg: 'ok',
            data: {}
        };
    dealFn.readFileData('coming.json').then((data) => {
        let list = data.data.returnValue
        let sendList = list.slice(offset, offset + limit)
        data.data.returnValue = sendList
        sendData.data = data;
        sendData.total = list.length
        res.send(JSON.stringify(sendData));
    }, (msg) => {
        sendData.errno = -1;
        sendData.msg = '暂时没有数据';
        res.send(JSON.stringify(sendData));
    })
})

router.get('/cinema', (req, res) => {
    sendDataFn(req, res, '_cinema.json', true);
})

router.get('/hot', (req, res) => {
    sendDataFn(req, res, '_hot.json', true);
})

router.get('/info', (req, res) => {
    sendDataFn(req, res, '_info.json', false);
})

router.get('/evaluation', (req, res) => {
    sendDataFn(req, res, '_evaluation.json', false);
})

router.get('/swiper', (req, res) => {
    sendDataFn(req, res, 'swiper.json', false);
})

router.get('/city', (req, res) => {
    sendDataFn(req, res, 'city.json', false);
})

router.get('/cinema_detail', (req, res) => {
    sendDataFn(req, res, 'cinema_detail.json', false);
})

module.exports = router