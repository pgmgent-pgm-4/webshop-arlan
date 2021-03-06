import { handleHTTPError, HTTPError } from '../../utils';
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
		const favorite = await database.Favorite.findByPk(favoriteId);

		// Favorite with orderId was not found.
		if (!favorite) {
			throw new HTTPError(`Could not found the favorite with id ${favoriteId}!`, 404);
		}
		// Send response
		res.status(200).json(favorite);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific favorite
*/
const getFavoritesByUserId = async (req, res, next) => {
	try {
		// Get favoriteId parameter
		const { userId } = req.params;
		// Get specific favorite from database
  const favorites = await database.Favorite.findAll({
   where: {
    UserId: userId 
   }
  });

		// Favorite with userId was not found.
		if (!favorites) {
			throw new HTTPError(`Could not found the favorite with id ${userId}!`, 404);
		}
		// Send response
		res.status(200).json(favorites);
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

  let checkIfFavoriteExists = await database.Favorite.findAll({
   where: {
    ProductId: model.ProductId,
    UserId: model.UserId
   }
  });


		// Create a favorite if not already in favorites
		if (!checkIfFavoriteExists.length) {
   const createdFavorite = await database.Favorite.create(model);
   res.status(201).json(createdFavorite);
  } else {
   res.status(409).json(`${model.ProductId} is already in your favorites`);
  }
		// Send response
		
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export { getFavoriteById, getFavortes, createFavorite, getFavoritesByUserId };
