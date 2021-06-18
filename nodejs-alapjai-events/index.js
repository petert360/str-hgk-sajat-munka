const { createReadStream, createWriteStream } = require('fs')
const { Transform } = require('stream')
const path = require('path')
const Logger = require('./Logger')

const sourcePath = './test/source.txt'
const destPath = `./test/${path.basename(
    sourcePath,
    path.extname(sourcePath)
)}Copy${path.extname(sourcePath)}`
const logResult = new Logger()

const capitalizeFirstLetters = str => {
    const words = str.split(' ')
    return words.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' ')
    // return words.join(' ')
}

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(capitalizeFirstLetters(chunk.toString()))
        callback()
    },
})

const readableStream = createReadStream(sourcePath, {
    encoding: 'utf8',
    highWaterMark: 8,
})

const writeableStream = createWriteStream(destPath)

readableStream.pipe(upperCaseTransform).pipe(writeableStream)

writeableStream.on('finish', () =>
    logResult.success('File transform successful.')
)
readableStream.on('error', () => logResult.error('File read error.'))
