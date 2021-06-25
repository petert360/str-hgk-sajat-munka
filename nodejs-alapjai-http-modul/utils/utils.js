const { createReadStream } = require('fs')
const { join } = require('path')

const logger = (url, method) => {
    currentTime = new Date().toLocaleString('hu-HU', {
        dateStyle: 'long',
        timeStyle: 'medium',
    })
    console.log(`DATE: ${currentTime} URL: ${url} METHOD: ${method}`)
}

const htmlResponse = (req, res, file, statusCode = 200) => {
    logger(req.url, req.method)
    res.writeHead(statusCode, {
        'Content-Type': 'text/html',
    })
    createReadStream(join(__dirname, `../views/${file}.html`)).pipe(res)
}

module.exports = { htmlResponse }
