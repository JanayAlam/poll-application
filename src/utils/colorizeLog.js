// https://stackoverflow.com/a/70748594
const chalk =  require('chalk');
const moment = require('moment');
const constant = require('./constant');

const log = console.log;

/**
 * log in the terminal.
 * @param {string} msg log message.
 * @param {string} logCategory message category
 */
module.exports = (
    msg,
    logCategory = constant.CONSOLE_LOG_CATEGORY.info,
    method = 'GET'
) => {
    logCategory = logCategory.toLowerCase();
    switch (logCategory) {
        case constant.CONSOLE_LOG_CATEGORY.success:
            log(
                `${moment().format('MMMM Do YYYY, h:mm:ss a')}: ` +
                    `${chalk.white.bgGreen.bold(' SUCCESS ')} ` +
                    `${chalk.green(msg)}`
            );
            break;
        case constant.CONSOLE_LOG_CATEGORY.apiSuccess:
            log(
                `${moment().format('MMMM Do YYYY, h:mm:ss a')}: ` +
                    `${chalk.white.bgGreen.bold(
                        ` ${method.toUpperCase()} `
                    )} ` +
                    `${chalk.green(msg)}`
            );
            break;
        case constant.CONSOLE_LOG_CATEGORY.error:
            log(
                `${moment().format('MMMM Do YYYY, h:mm:ss a')}: ` +
                    `${chalk.white.bgRed.bold(' ERROR ')} ` +
                    `${chalk.red(msg)}`
            );
            break;
        case constant.CONSOLE_LOG_CATEGORY.apiError:
            log(
                `${moment().format('MMMM Do YYYY, h:mm:ss a')}: ` +
                    `${chalk.white.bgRed.bold(` ${method.toUpperCase()} `)} ` +
                    `${chalk.red(msg)}`
            );
            break;
        default:
            log(
                `${moment().format('MMMM Do YYYY, h:mm:ss a')}: ` +
                    `${chalk.white.bgCyan.bold(' INFO ')} ` +
                    `${chalk.cyan(msg)}`
            );
            break;
    }
};
