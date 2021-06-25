// router importálása
const SiteController = require('./router/site.router')
// http modul importálása
const http = require('http')
//port megadása
const port = 8080

// server létrehozása
http.createServer((req, res) => {
    SiteController[req.url]
        ? SiteController[req.url](req, res)
        : SiteController['/404'](req, res)
})
    .on('error', err => console.log(`Server error: ${err.message}`))
    .on('listening', () =>
        console.log(`Server is listening at http://127.0.0.1:${port}`)
    )
    .listen(port)
