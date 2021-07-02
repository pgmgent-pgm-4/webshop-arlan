import passport from 'passport';
import passportJWT from 'passport-jwt';
import Logger from '../utils/logger';

import { EnvironmentVariables } from '../config';

// Initialise passport
const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

// Define jwtOptions
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: EnvironmentVariables.JWT_SECRET_KEY,
};

passport.use(
	new JwtStrategy(jwtOptions, async (jwtData, done) => {
		try {
			Logger.info(`${jwtData.username} does an authenticated request`);
			return done(null, jwtData.username);
		} catch (error) {
			return done(null, error);
		}
	}),
);

export default (req, res, next) => {
	if (req.method === 'GET') {
		Logger.info('Unauthenticated user does a GET request.');
		// no need to authenticate GET requests
		next();
	} else {
		// authenticate user
		passport.authenticate('jwt', { session: false }, (error, user, info) => {
			if (error || !user) {
				Logger.error(info);
				res.status(401).send(info);
			} else {
				Logger.info('User authenticed, POST request allowed');
				next();
			}
		})(req, res, next);
	}
};
