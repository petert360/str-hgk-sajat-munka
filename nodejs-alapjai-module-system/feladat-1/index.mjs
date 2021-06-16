import { increaseAndFormatDate } from './utils.mjs'

const dateArray = ['2000.01.01', '2001.01.01', '2002.01.01']

console.log('Az eredeti tömb: ', dateArray)
console.log('A módosított tömb: ', increaseAndFormatDate(dateArray))
