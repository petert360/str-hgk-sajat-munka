const yargs = require('yargs')
// const { id, producer, title } = require('./options');
const ProductService = require('./class/product.service')
const productService = new ProductService()

yargs
    .version('1.0.0')
    .usage('Usage: <command> [options]')
    .command({
        command: 'sum',
        describe: 'Get the sum of all products price',
        handler: async () => {
            console.log('Sum of all products:', await productService.getSumOfAllProductsPrice())
        },
    })
    .locale('en')
    .strict()
    .help()
    .parse()
