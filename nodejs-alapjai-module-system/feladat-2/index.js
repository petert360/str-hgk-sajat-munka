const utils = require('./utils')

const users = [
    {
        firstName: 'John',
        lastName: 'Doe',
        age: 22,
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        age: 17,
    },
]

utils.generateUserList = 1
utils.getUserNames = 2

console.log(utils.generateUserList(users))
console.log(utils.getUserNames(users))
