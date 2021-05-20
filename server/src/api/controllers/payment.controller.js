import { handleHTTPError, HTTPError } from '../../utils';
import database from '../../database';

/*
Get all payments
*/
const getPayments = async (req, res, next) => {
	try {
		// Get all payments from database
		const payments = await database.Payment.findAll();

		// Send response
		res.status(200).json(payments);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Get a specific payment
*/
const getPaymentById = async (req, res, next) => {
	try {
		// Get paymentId parameter
		const { paymentId } = req.params;
		// Get specific payment from database
		const payment = await database.Payment.findByPk(paymentId);

		// Order with paymentId was not found.
		if (!payment) {
			throw new HTTPError(`Could not found the payment with id ${paymentId}!`, 404);
		}
		// Send response
		res.status(200).json(payment);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Create a new payment
*/
const createPayment = async (req, res, next) => {
	try {
		// Get body from response
		const model = req.body;
		// Create a post
		const createdPayment = await database.Payment.create(model);
		// Send response
		res.status(201).json(createdPayment);
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Update an exisiting payment
*/
const updatePayment = async (req, res, next) => {
	try {
		// Get paymentId parameter
		const { paymentId } = req.params;
		// Get specific payment from database
		const payment = await database.Payment.findByPk(paymentId);

		if (!payment) {
			throw new HTTPError(`Could not found the order with id ${paymentId}!`, 404);
		}

		// Update a specific order
		const model = req.body;
		const updatedPayment = await database.Payment.update(model, {
			where: {
				id: paymentId,
			},
		});

		// Send response
		res.status(200).json(updatedPayment[0] === 1 ? 'Succesfully updated payment' : 'Error updating payment');
	} catch (error) {
		handleHTTPError(error, next);
	}
};

/*
Delete an exisiting payment
*/
const deletePayment = async (req, res, next) => {
	try {
		// Get paymentId parameter
		const { paymentId } = req.params;
		// Get specific category from database
		const payment = await database.Payment.findByPk(paymentId);

		if (!payment) {
			throw new HTTPError(`Could not found the order with id ${paymentId}!`, 404);
		}

		// Delete a category with specified id
		const message = await database.Payment.destroy({
			where: {
				id: paymentId,
			},
		});

		// Send response
		res.status(200).json(message === 1 ? 'Succesfully updated payment' : 'Error updating payment');
	} catch (error) {
		handleHTTPError(error, next);
	}
};

export {
	createPayment, getPayments, getPaymentById, updatePayment, deletePayment,
};
