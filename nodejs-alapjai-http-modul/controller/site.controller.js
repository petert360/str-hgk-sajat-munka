const { htmlResponse } = require('../utils/utils')

const index = (req, res) => htmlResponse(req, res, 'index')
const about = (req, res) => htmlResponse(req, res, 'about')
const contact = (req, res) => htmlResponse(req, res, 'contact')
const error404 = (req, res) => htmlResponse(req, res, '404', 404)

module.exports = Object.freeze({
    index,
    about,
    contact,
    error404,
})
