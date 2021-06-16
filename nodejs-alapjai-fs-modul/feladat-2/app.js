const { createReadStream, createWriteStream, unlink } = require('fs')
const { createGzip } = require('zlib')

const pathOriginal = './test/szamarmese.txt'
const pathBackup = './test/szamarmese.bak'
const pathCompressed = './test/szamarmese.txt.gz'

const deleteFileWrapper = path => {
    unlink(path, err => {
        if (err) throw err
        console.log(`Deleted: ${path}`)
    })
}

const readableStream = createReadStream(pathOriginal, {
    encoding: 'utf8',
    highWaterMark: 11,
})

const writeableStream = createWriteStream(pathBackup)
const createCompressedFile = createWriteStream(pathCompressed)

readableStream.pipe(writeableStream)

readableStream
    .pipe(createGzip())
    .pipe(createCompressedFile)
    .on('finish', () => {
        console.log('Backup done.')
        deleteFileWrapper(pathOriginal)
        deleteFileWrapper(pathBackup)
    })
