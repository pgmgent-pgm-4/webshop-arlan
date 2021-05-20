const convertArrayToPagedObject = (arr, itemsPerPage, currentPage, amount) => ({
	pageing: {
		itemsPerPage: parseInt(itemsPerPage, 10) || 10,
		currentPage: parseInt(currentPage, 10) || 1,
		totalPages: Math.ceil(amount / itemsPerPage),
		totalItems: amount,
	},
	results: arr.slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage),
});

const handleHTTPError = (error, next) => next(error);

const HTTPError = (message, statusCode) => {
	const instance = new Error(message);
	instance.statusCode = statusCode;

	return instance;
};

export { convertArrayToPagedObject, handleHTTPError, HTTPError };
