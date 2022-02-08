// https://stackoverflow.com/a/70748594
const chalk = require('chalk');
const moment = require('moment');

// Modules.
const universalVariables = require('./universalVariables');

const log = console.log;

/**
 * Log in the terminal.
 * @param {string} msg Log message.
 * @param {string} logCategory Message category.
 */
module.exports = (msg, logCategory = universalVariables.CONSOLE_LOG_CATEGORY.info, method = 'GET') => {
    logCategory = logCategory.toLowerCase();
    switch (logCategory) {
        case universalVariables.CONSOLE_LOG_CATEGORY.success:
            log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: `
                + `${chalk.white.bgGreen.bold(' SUCCESS ')} `
                + `${chalk.green(msg)}`);
            break;
        case universalVariables.CONSOLE_LOG_CATEGORY.apiSuccess:
            log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: `
                + `${chalk.white.bgGreen.bold(` ${method.toUpperCase()} `)} `
                + `${chalk.green(msg)}`);
            break;
        case universalVariables.CONSOLE_LOG_CATEGORY.error:
            log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: `
                + `${chalk.white.bgRed.bold(' ERROR ')} `
                + `${chalk.red(msg)}`);
            break;
        case universalVariables.CONSOLE_LOG_CATEGORY.apiError:
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
