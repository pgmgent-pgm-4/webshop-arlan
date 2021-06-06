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

const id = 'bitcoin';
const DETAIL_URL = `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=false&developer_data=true&sparkline=true`;

const getDetail = async(req, res, next) => {
	try {
		const tickerData = await fetch(URL);
		const tickerResponse = await tickerData.json();

		const detailData = await fetch(DETAIL_URL);
		const detailResponse = await detailData.json();
		res.render('detail', {
			tickerData: tickerResponse.slice(0, 30),
			detailData: detailResponse,
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

module.exports = {
	getHome,
	getDetail,
};
