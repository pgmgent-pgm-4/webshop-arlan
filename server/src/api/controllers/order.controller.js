import { handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all categories
*/
const getOrders = async (req, res, next) => {
	try {
		// Get all orders from database
		const orders = await database.Order.findAll();

		// Send response
		res.status(200).json(orders);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific order
*/
const getOrderById = async (req, res, next) => {
	try {
		// Get orderId parameter
		const { orderId } = req.params;
		// Get specific category from database
		const order = await database.Order.findByPk(orderId);

		// Order with orderId was not found.
		if (!order) {
			throw new HTTPError(`Could not found the order with id ${orderId}!`, 404);
		}
		// Send response
		res.status(200).json(order);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new order
*/
const createOrder = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdOrder = await database.Order.create(model);
		// Send response
		res.status(201).json(createdOrder);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting category
*/
const updateOrder = async (req, res, next) => {
	try {
		// Get orderId parameter
		const { orderId } = req.params;
		// Get specific category from database
		const order = await database.Order.findByPk(orderId);

		if (!order) {
			throw new HTTPError(`Could not found the order with id ${orderId}!`, 404);
		}

		// Update a specific order
		const model = req.body;
		const updatedOrder = await database.Order.update(model, {
			where: {
				id: orderId,
			},
		});

		// Send response
		res.status(200).json(updatedOrder === 1 ? 'Succesfully updated order' : 'Error updating order');
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting category
*/
const deleteOrder = async (req, res, next) => {
	try {
		// Get categoryId parameter
		const { orderId } = req.params;
		// Get specific category from database
		const order = await database.Order.findByPk(orderId);

		if (!order) {
			throw new HTTPError(`Could not found the order with id ${orderId}!`, 404);
		}

		// Delete a category with specified id
		const message = await database.Order.destroy({
			where: {
				id: orderId,
			},
		});

		// Send response
		res.status(200).json(message === 1 ? 'Succesfully updated order' : 'Error updating order');
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	createOrder, getOrders, getOrderById, updateOrder, deleteOrder,
};
