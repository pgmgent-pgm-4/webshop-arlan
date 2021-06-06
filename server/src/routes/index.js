import express from 'express';
import publicController from '../controllers/publicController';

const router = express.Router();

router.get('/', publicController.getHome);

router.get('/detail/:id', publicController.getDetail);

router.get('/overview', publicController.getOverview);

// export default Router;
module.exports = router;
