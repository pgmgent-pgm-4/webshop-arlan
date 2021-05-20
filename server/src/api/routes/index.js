/*
Import packages
*/
import express from 'express';

/*
Import custom packages
*/
import * as categoryController from '../controllers/category.controller';
import * as productController from '../controllers/product.controller';

/*
Make a router
*/
const router = express.Router();

/*
Routes
*/

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     description: Retrieve a list of categories. Can be used to populate a list of categories when prototyping or testing an API.*
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The category ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: The categories name.
 *                         example: Computers
 */
router.get('/categories', categoryController.getCategories);
router.get('/categories/:categoryId', categoryController.getCategoryById);
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category
 */
router.post('/categories', categoryController.createCategory);
router.put('/categories/:categoryId', categoryController.updateCategory);
router.delete('/categories/:categoryId', categoryController.deleteCategory);

router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getProductById);

export default router;
