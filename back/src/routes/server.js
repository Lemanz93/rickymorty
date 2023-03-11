const http = require('http');
const getChatById = require('../controllers/getCharById.js');
const getCharDetail = require('../controllers/getCharDetail.js');
const characters = require('../utils/data.js')

const PORT = 3001

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    let id = req.url.split('/').at(-1)
    if (req.url.includes('onsearch')) {
        getChatById(res, id)
    }

    if (req.url.includes('detail')) {
        getCharDetail(res, id)
    }


}).listen(PORT, 'localhost')