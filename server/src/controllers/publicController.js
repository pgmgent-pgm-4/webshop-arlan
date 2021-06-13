import fetch from 'node-fetch';
import database from '../database/';

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

const getDetail = async(req, res, next) => {
 try {
  // Get productId parameter
  const { productId } = req.params;
  console.log(req.params);
  const DETAIL_URL = `https://api.coingecko.com/api/v3/coins/${productId}?tickers=true&market_data=true&community_data=false&developer_data=true&sparkline=true`;
  console.log(DETAIL_URL)
  const tickerData = await fetch(URL);
  const tickerResponse = await tickerData.json();
  const detailData = await fetch(DETAIL_URL);
  const detailResponse = await detailData.json();
  // Get specific product from database
  const product = await database.Product.findAll({
   where: {
    id: productId.toUpperCase(),
   },
  });

  console.log('Received product from database:', JSON.stringify(product));

  res.render('detail', {
			tickerData: tickerResponse.slice(0, 30),
			detailData: detailResponse,
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

const getOverview = async(req, res, next) => {
	try {
		const data = await fetch(URL);
		const response = await data.json();
		res.render('overview', {
			tickerData: response.slice(0, 30),
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

const getCookieStatement = async(req, res, next) => {
	try {
		const data = await fetch(URL);
		const response = await data.json();
		res.render('cookies', {
			tickerData: response.slice(0, 30),
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

const getTypes = async(req, res, next) => {
	try {
		const data = await fetch(URL);
		const response = await data.json();
		res.render('types', {
			tickerData: response.slice(0, 30),
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

const getAboutUs = async(req, res, next) => {
	try {
		const data = await fetch(URL);
		const response = await data.json();
		res.render('about', {
			tickerData: response.slice(0, 30),
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

module.exports = {
	getHome,
	getDetail,
	getOverview,
	getCookieStatement,
	getTypes,
	getAboutUs,
};
