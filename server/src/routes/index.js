import express from 'express';
import publicController from '../controllers/publicController';
import * as productController from '../api/controllers/product.controller' 

const router = express.Router();

router.get('/', publicController.getHome);

router.get('/products/:productId', publicController.getDetail);

router.get('/profile/:userId', publicController.getProfile);

router.get('/overview', publicController.getOverview);

router.get('/cookies', publicController.getCookieStatement);

router.get('/types_of_crypto', publicController.getTypes);

router.get('/about', publicController.getAboutUs);

router.get('/contact', publicController.getContact);

// export default Router;
module.exports = router;
