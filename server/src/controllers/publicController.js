import fetch from 'node-fetch';

const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false';
const BASE_URL = 'http://localhost:8080/api';

const getHome = async(req, res, next) => {
	try {
		const response = await fetch(URL);
		const data = await response.json();
		res.render('index', {
			tickerData: data.slice(0, 30),
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

const getDetail = async(req, res, next) => {
 try {
  // Get productId parameter
  const { productId } = req.params;
  const DETAIL_URL = `https://api.coingecko.com/api/v3/coins/${productId}?tickers=true&market_response1=true&community_response=false&developer_response=true&sparkline=true`;
  const tickerData = await fetch(URL);
  const tickerResponse = await tickerData.json();
  const detailData = await fetch(DETAIL_URL);
  const detailResponse = await detailData.json();
  // Get specific product from response1base
  const product = await response1base.Product.findAll({
   where: {
    id: productId.toUpperCase(),
   },
  });

  res.render('detail', {
			tickerData: tickerResponse.slice(0, 30),
			detailData: detailResponse,
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

const getProfile = async(req, res, next) => {
 const { userId } = req.params;
 const response = await fetch(`${BASE_URL}/profiles/${userId}`);
 const profile = await response.json();
 res.render('profile', {
  profileData: profile
 })
}

const getOverview = async(req, res, next) => {
	try {
		const response = await fetch(URL);
		const data = await response.json();
		res.render('overview', {
			tickerData: data.slice(0, 30),
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

const getCookieStatement = async(req, res, next) => {
	try {
		const response = await fetch(URL);
		const data = await response.json();
		res.render('cookies', {
			tickerData: data.slice(0, 30),
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

const getTypes = async(req, res, next) => {
	try {
		const response = await fetch(URL);
		const data = await response.json();
		res.render('types', {
			tickerData: data.slice(0, 30),
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

const getAboutUs = async(req, res, next) => {
	try {
		const response = await fetch(URL);
		const data = await response.json();
		res.render('about', {
			tickerData: data.slice(0, 30),
		});
	} catch (error) {
		throw new Error(error, next);
	}
};

const getContact = async(req, res, next) => {
	try {
		const response = await fetch(URL);
		const data = await response.json();
		res.render('about', {
			tickerData: data.slice(0, 30),
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
 getProfile,
 getContact,
};
