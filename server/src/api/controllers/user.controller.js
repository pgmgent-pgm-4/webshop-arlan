import { handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all categories
*/
const getUsers = async (req, res, next) => {
	try {
		// Get all orders from database
		const users = await database.User.findAll();

		// Send response
		res.status(200).json(users);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific user
*/
const getUserById = async (req, res, next) => {
	try {
		// Get userId parameter
		const { userId } = req.params;
		// Get specific user from database
		const user = await database.User.findByPk(userId);

		// User with userId was not found
		if (!user) {
			throw new HTTPError(`Could not found the user with id ${userId}!`, 404);
		}
		// Send response
		res.status(200).json(user);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new user
*/
const createUser = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a user
		const createdUser = await database.User.create(model);
		// Send response
		res.status(201).json(createdUser);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting user
*/
const updateUser = async (req, res, next) => {
	try {
		// Get user parameter
		const { userId } = req.params;
		// Get specific user from database
		const user = await database.User.findByPk(userId);

		if (!user) {
			throw new HTTPError(`Could not found the user with id ${userId}!`, 404);
		}

		// Update a specific user
		const model = req.body;
		const updatedUser = await database.User.update(model, {
			where: {
				id: userId,
			},
		});

		// Send response
		res.status(200).json(updatedUser[0] === 1 ? 'Succesfully updated user' : 'Error updating user');
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting user
*/
const deleteUser = async (req, res, next) => {
	try {
		// Get userId parameter
		const { userId } = req.params;
		// Get specific userId from database
		const user = await database.User.findByPk(userId);

		if (!user) {
			throw new HTTPError(`Could not found the user with id ${userId}!`, 404);
		}

		// Delete a user with specified id
		const message = await database.User.destroy({
			where: {
				id: userId,
			},
		});

		// Send response
		res.status(200).json(message === 1 ? 'Succesfully deleted user' : 'Error deleting user');
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	createUser, getUsers, getUserById, updateUser, deleteUser,
};
