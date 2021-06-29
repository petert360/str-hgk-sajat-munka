const { count } = require('yargs')
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
    .command({
        command: 'avg',
        describe: 'Get the average price of all products',
        handler: async () => {
            console.log('Average price of all products:', await productService.getAvgPrice())
        },
    })
    .command({
        command: 'count',
        alias: 'c',
        type: 'number',
        demandOption: true,
        describe: 'Function lessthan',
        handler: async (count) => {
            console.log('Result of function "lessthan":', await productService.lessThan(count))
        },
    })

    .locale('en')
    .strict()
    .help()
    .parse()
