const SiteController = require('../controller/site.controller')

const router = {
    '/': (req, res) => SiteController.index(req, res),
    '/about': (req, res) => SiteController.about(req, res),
    '/contact': (req, res) => SiteController.contact(req, res),
    '/404': (req, res) => SiteController.error404(req, res),
}

module.exports = Object.freeze(router)
