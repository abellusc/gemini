import * as log4js from 'log4js';

log4js.configure({
    categories: {
        default: {
            appenders: [ 'stdout' ],
            level: 'info',
        }
    },
    appenders: {
        stdout: {
            type: 'stdout',
        }
    }
});

const Logger = log4js.getLogger();

export default Logger;
