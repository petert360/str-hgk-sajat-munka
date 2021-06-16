const generateUserList = arr =>
    arr.map(item => ({
        isAdult: item.age >= 18 ? 'true' : 'false',
        fullName: `${item.firstName} ${item.lastName}`,
    }))

const getUserNames = arr =>
    arr.map(item => `${item.firstName} ${item.lastName}`).join()

module.exports = Object.freeze({
    generateUserList,
    getUserNames,
})