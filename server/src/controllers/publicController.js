import fetch from 'node-fetch';

const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false';

const getHome = async(req, res, next) => {
	try {
		const data = await fetch(URL);
		const response = await data.json();
		res.render('index', {
			tickerData: response.slice(0, 30),
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

module.exports = {
	getHome,
};
