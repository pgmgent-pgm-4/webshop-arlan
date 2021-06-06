import express from 'express';
import publicController from '../controllers/publicController';

const router = express.Router();

router.get('/', publicController.getHome);

router.get('/:id', publicController.getDetail);

// export default Router;
module.exports = router;
