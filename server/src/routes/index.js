import express from 'express';
import publicController from '../controllers/publicController';

const router = express.Router();

router.get('/', publicController.getHome);

router.get('/detail/:id', publicController.getDetail);

router.get('/overview', publicController.getOverview);

router.get('/cookies', publicController.getCookieStatement);

router.get('/types_of_crypto', publicController.getTypes);

router.get('/about_us', publicController.getAboutUs);

// export default Router;
module.exports = router;
