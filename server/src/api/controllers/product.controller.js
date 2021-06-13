import { handleHTTPError } from '../../utils';
import database from '../../database';

/*
Get all products
*/
const getProducts = async (req, res, next) => {
	try {
		// Get products from database
		const products = await database.Product.findAll();
		// Send response
		res.status(200).json(products);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific product
*/
const getProductById = async (req, res, next) => {
	try {
		// Get productId parameter
		let { productId } = req.params;
  productId = productId.toUpperCase();
  console.log(productId);
		// Get specific product from database
		const product = await database.Product.findAll({
			where: {
				id: productId,
			},
		});

		// Send response
		res.status(200).json(product);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export { getProductById, getProducts };
