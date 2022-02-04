// https://stackoverflow.com/a/70748594
const chalk = require('chalk');
const moment = require('moment');

const log = console.log;

/**
 * Log in the terminal.
 * @param {string} msg Log message.
 * @param {string} logCategory Message category.
 */
module.exports = (msg, logCategory = 'info', method='GET') => {
    logCategory = logCategory.toLowerCase();
    switch (logCategory) {
        case 'success':
            log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: `
                + `${chalk.white.bgGreen.bold(' SUCCESS ')} `
                + `${chalk.green(msg)}`);
            break;
        case 'api_success':
            log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: `
                + `${chalk.white.bgGreen.bold(` ${method.toUpperCase()} `)} `
                + `${chalk.green(msg)}`);
            break;
        case 'error':
            log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: `
                + `${chalk.white.bgRed.bold(' ERROR ')} `
                + `${chalk.red(msg)}`);
            break;
        case 'api_error':
            log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: `
                + `${chalk.white.bgRed.bold(` ${method.toUpperCase()} `)} `
                + `${chalk.red(msg)}`);
            break;
        default:
            log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: `
                + `${chalk.white.bgCyan.bold(' INFO ')} `
                + `${chalk.cyan(msg)}`);
            break;
    }
}
