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

/*
Create a new product
*/
const createProduct = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdProduct = await database.Product.create(model);
		// Send response
		res.status(201).json(createdProduct);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting product
*/
const updateProduct = async (req, res, next) => {
	try {
		// Get productId parameter
		const { productId } = req.params;
		// Get specific product from database
		const product = await database.Product.findByPk(productId);

		if (!product) {
			throw new HTTPError(`Could not found the order with id ${productId}!`, 404);
		}

		// Update a specific order
		const model = req.body;
		const updatedProduct = await database.Product.update(model, {
			where: {
				id: productId,
			},
		});

		// Send response
		res.status(200).json(updatedProduct[0] === 1 ? 'Succesfully updated product' : 'Error updating product');
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting product
*/
const deleteProduct = async (req, res, next) => {
	try {
		// Get productId parameter
		const { productId } = req.params;
		// Get specific category from database
		const product = await database.Product.findByPk(productId);

		if (!product) {
			throw new HTTPError(`Could not found the order with id ${productId}!`, 404);
		}

		// Delete a category with specified id
		const message = await database.Product.destroy({
			where: {
				id: productId,
			},
		});

		// Send response
		res.status(200).json(message === 1 ? 'Succesfully updated product' : 'Error updating product');
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export { getProductById, getProducts, createProduct, updateProduct, deleteProduct };
