import passport from 'passport';
import passportJWT from 'passport-jwt';

import { EnvironmentVariables } from '../config';

// Initialise passport
const JwtStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

// Define jwtOptions
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: EnvironmentVariables.JWT_SECRET_KEY,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtData, done) => {
	try {
		// Logger.info(`${jwtData.username} does an authenticated request`);
		return done(null, jwtData.username);
	} catch (error) {
		return done(null, error);
	}
});

export { jwtStrategy };
