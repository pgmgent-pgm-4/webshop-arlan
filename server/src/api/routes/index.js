/*
Import packages
*/
import express from 'express';

/*
Import custom packages
*/
import * as productReviewsController from '../controllers/product_reviews.controller';
import * as favoriteController from '../controllers/favorite.controller';
import * as categoryController from '../controllers/category.controller';
import * as productController from '../controllers/product.controller';
import * as paymentController from '../controllers/payment.controller';
import * as orderController from '../controllers/order.controller';
import * as userController from '../controllers/user.controller';
import * as profileController from '../controllers/profile.controller';
import * as authenticationController from '../../actions/auth';
import { passport } from '../../middleware';

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

router.get('/favorites', favoriteController.getFavortes);
router.get('/favorites/all/:favoriteId', favoriteController.getFavoriteById);
router.get('/favorites/:userId', favoriteController.getFavoritesByUserId);
router.post('/favorites', favoriteController.createFavorite);

router.get('/orders', passport, orderController.getOrders);
router.get('/orders/:orderId', orderController.getOrderById);
router.post('/orders', orderController.createOrder);
router.put('/orders/:orderId', orderController.updateOrder);
router.delete('/orders/:orderId', orderController.deleteOrder);

router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

router.get('/profiles', profileController.getProfiles);
router.get('/profiles/:userId', profileController.getProfileById);
router.post('/profiles', profileController.createProfile);
router.put('/profiles/:userId', profileController.updateProfile);
router.delete('/profiles/:userId', profileController.deleteProfile);

router.get('/payments', paymentController.getPayments);
router.get('/payments/:paymentId', paymentController.getPaymentById);
router.post('/payments', paymentController.createPayment);
router.put('/payments', paymentController.updatePayment);
router.delete('/payments', paymentController.deletePayment);

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);

router.get('/productReviews', productReviewsController.getProductReviews);
router.get('/productReviews/:productReviewId', productReviewsController.getProductReviewById);
router.post('/productReviews', productReviewsController.createProductReview);
router.put('/productReviews', productReviewsController.updateProductReview);
router.delete('/productReview', productReviewsController.deleteProductReview);

router.post('/register', authenticationController.handleRegister);
router.post('/login', authenticationController.handleLogin);

export default router;
