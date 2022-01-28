// https://stackoverflow.com/a/70748594
const chalk = require('chalk')

const moment = require('moment')

log = console.log

module.exports = (msg, logCategory = 'info') => {
    logCategory = logCategory.toLowerCase();
    switch (logCategory) {
        case 'success':
            log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: `
                + `${chalk.white.bgGreen.bold(' SUCCESS ')} `
                + `${chalk.green(msg)}`);
            break;
        case 'error':
            log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: `
                + `${chalk.white.bgRed.bold(' ERROR ')} `
                + `${chalk.red(msg)}`);
            break;
        default:
            log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}: `
                + `${chalk.white.bgCyan.bold(' INFO ')} `
                + `${chalk.cyan(msg)}`);
            break;
    }
}
