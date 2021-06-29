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
        return sum
    }

    async getAvgPrice() {
        if (!this.products) {
            await this.init()
        }
        let sum = 0
        let count = 0
        this.products.forEach(item => {
            sum += item.price * item.count
            count += Number(item.count)
        })

        return (sum/count).toFixed(2)
        /*this.getSumOfAllProductsPrice()
            .then (result => result / Object.keys(this.products).length)*/
    }

    async lessThan(count) {
        if (!this.products) {
            await this.init()
        }
        return this.products.filter(item => item.count<count)

    }

}

