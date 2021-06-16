const { mkdir, writeFile } = require('fs').promises

const createTemplate = () => {
    mkdir('controllers')
        .then(
            writeFile('./controllers/site.controller.js', 'SITE.CONTROLLER.JS')
        )
        .then(mkdir('routers'))
        .then(writeFile('./routers/site.router.js', 'SITE.ROUTER.JS'))
        .then(mkdir('views'))
        .then(writeFile('./views/index.html', 'INDEX.HTML'))
        .then(writeFile('app.js', 'APP.JS'))
        .catch(err => console.log(err))
}

module.exports = createTemplate
