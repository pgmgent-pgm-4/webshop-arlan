import passport from 'passport';
import passportJWT from 'passport-jwt';

import { databaseVariables, EnvironmentVariables } from '../config';

// Initialise passport
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// Define jwtOptions
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: EnvironmentVariables.JWT_SECRET_KEY,
};

let jwtStrategy = null;

if (jwtStrategy === null) {
  new JwtStrategy(jwtOptions, async (jwtData, done) => {
    try {
      //Logger.info(`${jwtData.username} does an authenticated request`);
      return done(null, jwtData.username);
    } catch (error) {
      done(null, error);
    }
  });
};

export {
  jwtStrategy,
}