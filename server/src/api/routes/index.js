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


router.get('/categories', categoryController.getCategories);
router.get('/categories/:categoryId', categoryController.getCategoryById);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:categoryId', categoryController.updateCategory);
router.delete('/categories/:categoryId', categoryController.deleteCategory);

router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getProductById);



router.get('/favorites', favoriteController.getFavortes);
router.get('/favorites/all/:favoriteId', favoriteController.getFavoriteById);
router.get('/favorites/:userId', favoriteController.getFavoritesByUserId);
router.post('/favorites', favoriteController.createFavorite);


/**
 * @swagger
 * /api/orders/:
 *   get:
 *     summary: Retrieve all orders
 *     tags:
 *       - orders
 *     description: Retrieve an array of objects, each object containing an order
 *     responses:
 *       200:
 *         description: A list of orders
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
 *                         description: The order id
 *                         example: 1
 *                       date:
 *                         type: string
 *                         description: ISO date
 *                         example: 2021-06-14 10:10:09.983+00:00
 *                       price:
 *                         type: integer
 *                         description: Order price
 *                         example: 459
 *                       order_value:
 *                         type: integer
 *                         description: Amount of products bought for the order
 *                         example: 20
 *                       status: 
 *                         type: string
 *                         description: Order status
 *                         example: pending
 *                       createdAt:
 *                         type: text
 *                         description: Order creation date
 *                         example: 2021-06-14 10:10:09.983 +00:00
 *                       updatedAt:
 *                         type: text
 *                         description: Order update date
 *                         example: 2021-06-14 10:10:09.983 +00:00
 *                       UserId:
 *                         type: integer
 *                         description: ID of the user who placed the order
 *                         example: 1
 */
router.get('/orders', passport, orderController.getOrders);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     tags:
 *       - orders
 *     summary: Retrieve order by orderId
 *     description: Retrieve a specific order by orderId
 *     parameters:
 *     - in: path
 *       name: orderId
 *       required: true
 *       schema:
 *        type: integer
 *        minimum: 1
 *       description: Order ID
 *     responses:
 *       200:
 *         description: An order object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Order'
 */
router.get('/orders/:orderId', orderController.getOrderById);

/**
 * @swagger
 * /api/orders/:
 *   post:
 *     tags:
 *       - orders
 *     summary: Create a new order
 *     description: Create a new order using an object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Order'
 *     responses:
 *       201:
 *        description: Succesful POST operation
 *        schema:
 *          $ref: '#/definitions/Order'
 *       400:
 *          description: Invalid order body
 */
router.post('/orders', orderController.createOrder);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   put:
 *     tags:
 *       - orders
 *     summary: Update an existing order
 *     description: Update an existing order using an object
 *     parameters:
 *     - in: path
 *       name: orderId
 *       required: true
 *       schema:
 *        type: integer
 *        minimum: 1
 *       description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Order'
 *     responses:
 *       201:
 *        description: Succesful POST operation
 *        schema:
 *          $ref: '#/definitions/Order'
 *       400:
 *          description: Invalid order body
 */
router.put('/orders/:orderId', orderController.updateOrder);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   delete:
 *     tags:
 *       - orders
 *     summary: Delete an existing order
 *     description: Delete an existing order using orderId
 *     parameters:
 *     - in: path
 *       name: orderId
 *       required: true
 *       schema:
 *        type: integer
 *        minimum: 1
 *       description: Order ID
 *     responses:
 *       201:
 *        description: Succesful POST operation
 *       400:
 *          description: Invalid orderId
 */
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


/**
 * @swagger
 * /api/products/:
 *   get:
 *     summary: Retrieve all products
 *     tags:
 *       - products
 *     description: Retrieve an array of objects, each object containing a product
 *     responses:
 *       200:
 *         description: A list of products
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
 *                         type: string
 *                         description: The product id
 *                         example: BITCOIN
 *                       createdAt:
 *                         type: text
 *                         description: Order creation date
 *                         example: 2021-06-14 10:10:09.983 +00:00
 *                       updatedAt:
 *                         type: text
 *                         description: Order update date
 *                         example: 2021-06-14 10:10:09.983 +00:00
 */
router.get('/products', productController.getProducts);

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Retrieve product by productId
 *     tags:
 *       - products
 *     description: Retrieve an object containing a product by productId
 *     parameters:
 *     - in: path
 *       name: productId
 *       required: true
 *       schema:
 *        type: string
 *        description: productId
 *     responses:
 *       200:
 *         description: A specific product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: string
 *                   description: Product ID
 *                   example: BITCOIN
 *                 createdAt:
 *                   type: text
 *                   description: Order creation date
 *                   example: 2021-06-14 10:10:09.983 +00:00
 *                 updatedAt:
 *                   type: text
 *                   description: Order update date
 *                   example: 2021-06-14 10:10:09.983 +00:00
 */
router.get('/products/:id', productController.getProductById);

/**
 * @swagger
 * /api/products/:
 *   post:
 *     tags:
 *       - products
 *     summary: Create a new product 
 *     description: Create a new product using an object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *        description: Succesful POST operation
 *        schema:
 *          $ref: '#/definitions/Product'
 *       400:
 *          description: Invalid order body
 */
router.post('/products', productController.createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - products
 *     summary: Update an existing product
 *     description: Update an existing product using an object
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *        type: string
 *       description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Product'
 *     responses:
 *       201:
 *        description: Succesful POST operation
 *        schema:
 *          $ref: '#/definitions/Product'
 *       400:
 *          description: Invalid order body
 */
router.put('/products/:id', productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - products
 *     summary: Delete an existing product
 *     description: Delete an existing product using productId
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *        type: string
 *        description: Product ID
 *     responses:
 *       201:
 *        description: Succesful POST operation
 *       400:
 *          description: Invalid id
 */
router.delete('/products/:id', productController.deleteProduct);


/**
 * @swagger
 * /api/productReviews/:
 *   get:
 *     summary: Retrieve all product reviews
 *     tags:
 *       - product_reviews
 *     description: Retrieve an array of objects, each object containing a product review
 *     responses:
 *       200:
 *         description: A list of product reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Product_review'
 */
router.get('/productReviews', productReviewsController.getProductReviews);

/**
 * @swagger
 * /api/productReviews/{productReviewId}:
 *   get:
 *     tags:
 *       - product_reviews
 *     summary: Get an existing product review
 *     description: Get an existing product review using productReviewId
 *     parameters:
 *     - in: path
 *       name: productReviewId
 *       required: true
 *       schema:
 *        type: integer
 *        minimum: 1
 *       description: productReviewId
 *     responses:
 *       201:
 *        description: Succesful POST operation
 *       400:
 *          description: Invalid orderId
 */
router.get('/productReviews/:productReviewId', productReviewsController.getProductReviewById);

/**
 * @swagger
 * /api/productReviews/:
 *   post:
 *     tags:
 *       - product_reviews
 *     summary: Create a new product review
 *     description: Create a new product review using an object
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Product_review'
 *     responses:
 *       201:
 *        description: Succesful POST operation
 *        schema:
 *          $ref: '#/definitions/Product_review'
 *       400:
 *          description: Invalid order body
 */
router.post('/productReviews', productReviewsController.createProductReview);

/**
 * @swagger
 * /api/orders/{productReviewId}:
 *   put:
 *     tags:
 *       - product_reviews
 *     summary: Update an existing product review
 *     description: Update an existing product review using an object
 *     parameters:
 *     - in: path
 *       name: productReviewId
 *       required: true
 *       schema:
 *        type: integer
 *        minimum: 1
 *       description: Product Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Product_review'
 *     responses:
 *       201:
 *        description: Succesful POST operation
 *        schema:
 *          $ref: '#/definitions/Product_review'
 *       400:
 *          description: Invalid order body
 */
router.put('/productReviews/:productReviewId', productReviewsController.updateProductReview);

/**
 * @swagger
 * /api/orders/{productReviewId}:
 *   delete:
 *     tags:
 *       - product_reviews
 *     summary: Delete an existing product review
 *     description: Delete an existing product review using productReviewId
 *     parameters:
 *     - in: path
 *       name: productReviewId
 *       required: true
 *       schema:
 *        type: integer
 *        minimum: 1
 *       description: Product Review ID
 *     responses:
 *       201:
 *        description: Succesful POST operation
 *       400:
 *          description: Invalid productReviewId
 */
router.delete('/productReview/:productReviewId', productReviewsController.deleteProductReview);

router.post('/register', authenticationController.handleRegister);
router.post('/login', authenticationController.handleLogin);

export default router;

/**
 * @swagger
 * definitions:
 *   Order:
 *     type: object
 *     properties:
 *       date:
 *         type: string
 *         enum:
 *         - 2021-06-15 14:29:59.802 +00:00
 *       price: 
 *         type: integer
 *         format: int32
 *         minimum: 100
 *       order_value:
 *         type: integer
 *         format: int32,
 *         minimum: 0.1313
 *       status:
 *         type: string
 *         enum:
 *         - pending
 *         - processing
 *         - completed
 *       UserId:
 *         type: integer
 *         format: int32
 *         minimum: 1 
 *         maximum: 10
 *   Product:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         enum:
 *         - BITCOIN
 *         - ETHEREUM
 *         - LITECOIN
 *         - WOMENCOIN
 *   Product_review:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         enum:
 *         - wow!
 *         - changed my life!
 *         - I went from being broke and lonely to being rich and lonely!
 *       rating:
 *         type: integer
 *         format: int32
 *         minimum: 1
 *         maximum: 10
 *       UserId:
 *         type: integer
 *         format: int32
 *         minimum: 1
 *         maximum: 25
 *       ProductId:
 *         type: string
 *         enum:
 *         - BITCOIN
 *         - LITECOIN
 *         - WOMENCOIN
 */