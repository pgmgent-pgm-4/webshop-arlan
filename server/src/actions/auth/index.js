import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { parseUserRequest } from './parseRequest';
import { EnvironmentVariables } from '../../config';
import database from '../../database';
import Logger from '../../utils/logger';

const { ExtractJwt } = passportJWT;
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: EnvironmentVariables.JWT_SECRET_KEY,
	jwtLifeTime: EnvironmentVariables.JWT_LIFETIME,
	jwtSaltRounds: EnvironmentVariables.JWT_SALT_ROUNDS,
};

/**
	* Check if the password is valid
	* @param {*} user
	* @param {*} password
	*/
const isValidPassword = async (user, password) => {
	const match = await bcrypt.compare(password, user.password);
	return match;
};

const LocalStrategy = passportLocal.Strategy;
passport.use(
	new LocalStrategy(
		{ emailField: 'email', passwordField: 'password' },
		async (username, password, done) => {
			try {
				// get user by username
				const foundUser = await database.User.findOne({ where: { username: username } });

				// check if user exists
				if (!foundUser) {
					return done(null, false, { message: 'Incorrect username.' });
				}

				// check if password is correct
				if (!(await isValidPassword(foundUser, password))) {
					return done(null, false, { message: 'Incorrect password.' });
				}

				return done(null, foundUser.dataValues);
			} catch (e) {
				return done(e);
			}
		},
	),
);

const handleLogin = async (req, res) => {
	passport.authenticate('local', (error, user, info) => {
		if (error) {
			res.status(401).send(error);
		} else if (!user) {
			res.status(401).send(info);
		} else {
			Logger.info('User succesfully logged in.');
			const token = jwt.sign(user, jwtOptions.secretOrKey, { expiresIn: Number(jwtOptions.jwtLifeTime) });
			res.status(200).json({
				success: true,
				token: token,
				user: {
					id: user.id,
					username: user.username,
				},
			});
		}
	})(req, res);
};

const handleRegister = async (req, res) => {
	const { username, password, email } = parseUserRequest(req, res);
	bcrypt.hash(password, Number(jwtOptions.jwtLifeTime)).then((hash) => {
		database.User.create({ username: username, password: hash, email: email, });
		res.status(200).json({message: 'You have succesfully registered. You can now login.'});
	});
};

export {
	handleLogin, handleRegister,
};
