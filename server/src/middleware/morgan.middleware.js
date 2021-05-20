import chalk from 'chalk';
import moment from 'moment';
import morgan from 'morgan';

/*
Morgan
https://www.npmjs.com/package/morgan
*/
const morganMiddleware = morgan((tokens, req, res) => [
	chalk.hex('#ffffff').bold(`${moment(tokens.date(req, res)).format('YYYY-MM-DD hh:mm:ss')}`),
	chalk.hex('#34ace0').bold(`[${tokens.method(req, res)}]`),
	':\t',
	chalk.hex('#ff5252').bold(`[${tokens.url(req, res)}]`),
	chalk.hex('#f78fb3').bold(`[${tokens.status(req, res)}]`),
	chalk.hex('#fffff').bold(`${tokens['response-time'](req, res)}ms`),
	chalk.hex('#fffff').bold(tokens['remote-addr'](req, res)),
	'',
].join(' '));

export default morganMiddleware;
