const express = require("express");
const {
  createBook,
  getBooks,
  getBookById,
} = require("../controllers/bookController");
const { createReview } = require("../controllers/reviewController");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - description
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *                 description: Book title
 *                 example: The Great Gatsby
 *               author:
 *                 type: string
 *                 description: Book author
 *                 example: F. Scott Fitzgerald
 *               description:
 *                 type: string
 *                 description: Book description
 *                 example: A novel about the American Dream
 *               genre:
 *                 type: string
 *                 description: Book genre
 *                 example: Fiction
 *               publishedYear:
 *                 type: number
 *                 description: Year the book was published
 *                 example: 1925
 *               isbn:
 *                 type: string
 *                 description: Book ISBN
 *                 example: 978-3-16-148410-0
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized, no token or token invalid
 */
router.post("/", protect, createBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books with pagination and optional filters
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of books per page
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author (case-insensitive, partial match)
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre (case-insensitive, partial match)
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 50
 *                     pages:
 *                       type: integer
 *                       example: 5
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d0fe4f5311236168a109ca
 *                       title:
 *                         type: string
 *                         example: The Great Gatsby
 *                       author:
 *                         type: string
 *                         example: F. Scott Fitzgerald
 *                       description:
 *                         type: string
 *                         example: A novel about the American Dream
 *                       genre:
 *                         type: string
 *                         example: Fiction
 *                       publishedYear:
 *                         type: number
 *                         example: 1925
 *                       isbn:
 *                         type: string
 *                         example: 978-3-16-148410-0
 *                       createdBy:
 *                         type: string
 *                         example: 60d0fe4f5311236168a109cb
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-01-01T00:00:00.000Z
 */
router.get("/", getBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get book details by ID, including average rating and reviews with pagination
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for reviews
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of reviews per page
 *     responses:
 *       200:
 *         description: Book details with reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     title:
 *                       type: string
 *                       example: The Great Gatsby
 *                     author:
 *                       type: string
 *                       example: F. Scott Fitzgerald
 *                     description:
 *                       type: string
 *                       example: A novel about the American Dream
 *                     genre:
 *                       type: string
 *                       example: Fiction
 *                     publishedYear:
 *                       type: number
 *                       example: 1925
 *                     isbn:
 *                       type: string
 *                       example: 978-3-16-148410-0
 *                     createdBy:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109cb
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-01-01T00:00:00.000Z
 *                     averageRating:
 *                       type: number
 *                       example: 4.5
 *                     reviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 60d0fe4f5311236168a109cc
 *                           rating:
 *                             type: number
 *                             example: 5
 *                           comment:
 *                             type: string
 *                             example: Great book, highly recommended!
 *                           user:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 60d0fe4f5311236168a109cb
 *                               username:
 *                                 type: string
 *                                 example: johndoe
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2023-01-01T00:00:00.000Z
 *                     reviewsPagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 25
 *                         pages:
 *                           type: integer
 *                           example: 3
 *                         currentPage:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *       404:
 *         description: Book not found
 */
router.get("/:id", getBookById);

/**
 * @swagger
 * /api/books/{id}/reviews:
 *   post:
 *     summary: Submit a review for a book
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Rating from 1 to 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 description: Review comment
 *                 example: Great book, highly recommended!
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Validation error or user already reviewed this book
 *       401:
 *         description: Not authorized, no token or token invalid
 *       404:
 *         description: Book not found
 */
router.post("/:id/reviews", protect, createReview);

module.exports = router;
