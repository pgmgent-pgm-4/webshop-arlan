import express from 'express';
import { Router } from "express";

import publicController from '../controllers/publicController'
const router = express.Router();


router.get('/', publicController.getHome);

// export default Router;
module.exports = router;