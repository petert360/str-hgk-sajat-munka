const ProductAPI = require('./product.api')

module.exports = class ProductService {
    constructor() {
        this.api = new ProductAPI('./database/products.json', 'products')
        this.products = null
        this.init()
    }

    async init() {
        this.products = await this.api.get()
    }

    async getSumOfAllProductsPrice() {
        if (!this.products) {
            await this.init()
        }
        let sum = 0
        this.products.forEach(item => (sum += item.price * item.count))
        return sumAdatok 
    }
}
