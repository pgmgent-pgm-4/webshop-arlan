import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import path from 'path';
import nunjucks from 'nunjucks';
import swaggerUi from 'swagger-ui-express';
import { createTerminus } from '@godaddy/terminus';

/*
Custom modules
*/
import { EnvironmentVariables } from './config';
import { morganMiddleware, swaggerSpec } from './middleware';
import apiRoutes from './api/routes';

/*
Database
*/
import database from './database';

database.connect();

/*
Create Express app
*/
const app = express();

/*
View Engine
*/
nunjucks.configure(path.join(__dirname, 'views'), {
	autoescape: true,
	express: app,
	noCache: true,
	watch: true,
});
app.set('view engine', 'html');

/*
bodyParser
*/
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(bodyParser.json());

/*
Helmet
https://helmetjs.github.io/
*/
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

/*
Morgan
https://www.npmjs.com/package/morgan
*/
if (EnvironmentVariables.NODE_ENV === 'development') {
	app.use(morganMiddleware);
}

/*
API Routes
*/
app.use('/api', cors(), apiRoutes);

/*
Swagger
*/
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*
Not Found routes
*/
app.get('*', (req, res, next) => {
	const err = new Error(`${req.ip} tried to access ${req.originalUrl}`);
	err.statusCode = 301;
	next(err);
});

/*
Error Handling
*/
app.use((err, req, res, next) => {
	const error = err;
	error.statusCode = error.statusCode || 500;
	res.status(error.statusCode);

	const body = {
		url: req.url,
		error: {
			message: error.message,
			statusCode: error.statusCode,
		},
	};

	if (req.accepts('json')) {
		res.json(body);
	} else if (req.accepts('html')) {
		res.render('error', body);
	} else {
		res.send('You have to accept application/json or text/html!');
	}
	next();
});

/*
Create the server
*/
const server = http.createServer(app);

/*
Shutdown the application gracefully
*/
const onSignal = () => {
	console.log('server is starting cleanup');
	// start cleanup of resource, like databases or file descriptors
};

const onHealthCheck = async () => {
	// checks if the system is healthy, like the db connection is live
	// resolves, if health, rejects if not
};

createTerminus(server, {
	signal: 'SIGINT',
	healthChecks: { '/healthcheck': onHealthCheck },
	onSignal,
});

/*
Server
Listen to incoming requests
*/
if (EnvironmentVariables.NODE_ENV !== 'test') {
	server.listen(EnvironmentVariables.PORT, EnvironmentVariables.HOSTNAME, (err) => {
		if (err) throw err;
		if (EnvironmentVariables.NODE_ENV === 'development') {
			console.log(`Server is listening at http://${EnvironmentVariables.HOSTNAME}:${EnvironmentVariables.PORT}!`);
		}
	});
}
