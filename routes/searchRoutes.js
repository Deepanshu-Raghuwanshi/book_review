const express = require("express");
const { searchBooks } = require("../controllers/bookController");

const router = express.Router();

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search books by title or author and return with reviews
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query (title or author)
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
 *     responses:
 *       200:
 *         description: Search results with reviews
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
 *                       example: 5
 *                     pages:
 *                       type: integer
 *                       example: 1
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
 *                       averageRating:
 *                         type: number
 *                         example: 4.5
 *                       reviews:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: 60d0fe4f5311236168a109cc
 *                             rating:
 *                               type: number
 *                               example: 5
 *                             comment:
 *                               type: string
 *                               example: Great book, highly recommended!
 *                             user:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                   example: 60d0fe4f5311236168a109cb
 *                                 username:
 *                                   type: string
 *                                   example: johndoe
 *                             createdAt:
 *                               type: string
 *                               format: date-time
 *                               example: 2023-01-01T00:00:00.000Z
 *       400:
 *         description: No search query provided
 */
router.get("/", searchBooks);

module.exports = router;
