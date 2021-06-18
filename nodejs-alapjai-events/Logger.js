const EventEmitter = require('events')

class Logger extends EventEmitter {
    error(err) {console.log('\x1b[31m', err)}
    success(succ) {console.log('\x1b[32m', succ)}
}

/*
const logger = new Logger
logger.error('asd')
*/
module.exports = Logger
