/**
 * A logger object
 */

import chalk from 'chalk';

export default {
	info: (text) => console.log(chalk.blue(`info: ${text}`)),
	stressedInfo: (text) => console.log(chalk.bgBlue(`info: ${text}`)),
	error: (text) => console.log(chalk.redBright(`error: ${text}`)),
	stressedError: (text) => console.log(chalk.bgRedBright(`error: ${text}`)),
	warning: (text) => console.log(chalk.rgb(255, 165, 0)(`error: ${text}`)),
	stressedWarning: (text) => console.log(chalk.bgRgb(255, 165, 0)(`error: ${text}`)),
};
