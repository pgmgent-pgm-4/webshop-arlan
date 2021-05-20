import { handleHTTPError } from '../../utils';
import database from '../../database';

/*
Get all favorites
*/
const getFavortes = async (req, res, next) => {
	try {
		// Get favorites from database
		const favorites = await database.Favorite.findAll();
		// Send response
		res.status(200).json(favorites);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific favorite
*/
const getFavoriteById = async (req, res, next) => {
	try {
		// Get favoriteId parameter
		const { favoriteId } = req.params;
		// Get specific favorite from database
		const favorite = await database.Favorite.findAll({
			where: {
				id: favoriteId,
			},
		});
		// Send response
		res.status(200).json(favorite);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new favorite
*/
const createFavorite = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdFavorite = await database.Favorite.create(model);
		// Send response
		res.status(201).json(createdFavorite);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export { getFavoriteById, getFavortes, createFavorite };
