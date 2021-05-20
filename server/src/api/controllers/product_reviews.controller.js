import { handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all product reviews
*/
const getProductReviews = async (req, res, next) => {
	try {
		// Get all product reviews from database
		const productReviews = await database.Product_reviews.findAll();

		// Send response
		res.status(200).json(productReviews);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific product review
*/
const getProductReviewById = async (req, res, next) => {
	try {
		// Get productReviewId parameter
		const { productReviewId } = req.params;
		// Get specific product review from database
		const productReview = await database.Product_reviews.findByPk(productReviewId);

		// Order with orderId was not found.
		if (!productReview) {
			throw new HTTPError(`Could not found the order with id ${productReview}!`, 404);
		}
		// Send response
		res.status(200).json(order);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new product review
*/
const createProductReview = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdProductReview = await database.Product_reviews.create(model);
		// Send response
		res.status(201).json(createdProductReview);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting category
*/
const updateProductReview = async (req, res, next) => {
	try {
		// Get productReviewId parameter
		const { productReviewId } = req.params;
		// Get specific product review from database
		const productReview = await database.Product_reviews.findByPk(productReviewId);

		if (!productReview) {
			throw new HTTPError(`Could not found the product review with id ${productReviewId}!`, 404);
		}

		// Update a specific order
		const model = req.body;
		const updatedProductReview = await database.Product_reviews.update(model, {
			where: {
				id: productReviewId,
			},
		});

		// Send response
		res.status(200).json(updatedProductReview[0] === 1 ? 'Succesfully updated product review' : 'Error updating product review');
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting category
*/
const deleteProductReview = async (req, res, next) => {
	try {
		// Get productReviewId parameter
		const { productReviewId } = req.params;
		// Get specific product review from database
		const productReview = await database.Product_reviews.findByPk(productReviewId);

		if (!productReview) {
			throw new HTTPError(`Could not found the product review with id ${productReviewId}!`, 404);
		}

		// Delete a category with specified id
		const message = await database.Order.destroy({
			where: {
				id: productReviewId,
			},
		});

		// Send response
		res.status(200).json(message === 1 ? 'Succesfully updated product review' : 'Error updating product review');
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	createProductReview, getProductReviews, getProductReviewById, updateProductReview, deleteProductReview,
};
