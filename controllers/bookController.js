const Book = require("../models/Book");
const Review = require("../models/Review");

/**
 * @desc    Create a new book
 * @route   POST /api/books
 * @access  Private
 */
const createBook = async (req, res, next) => {
  try {
    const { title, author, description, genre, publishedYear, isbn } = req.body;

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      publishedYear,
      isbn,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all books with pagination and filters
 * @route   GET /api/books
 * @access  Public
 */
const getBooks = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = {};

    // Filter by author
    if (req.query.author) {
      query.author = { $regex: req.query.author, $options: "i" };
    }

    // Filter by genre
    if (req.query.genre) {
      query.genre = { $regex: req.query.genre, $options: "i" };
    }

    // Execute query
    const books = await Book.find(query)
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count
    const total = await Book.countDocuments(query);

    // Pagination result
    const pagination = {
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      limit,
    };

    res.json({
      success: true,
      pagination,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get book by ID with reviews
 * @route   GET /api/books/:id
 * @access  Public
 */
const getBookById = async (req, res, next) => {
  try {
    // Pagination for reviews
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Get book
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Get reviews for the book
    const reviews = await Review.find({ book: req.params.id })
      .populate("user", "username")
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total reviews count
    const totalReviews = await Review.countDocuments({ book: req.params.id });

    // Get average rating
    const averageRating = await Review.getAverageRating(req.params.id);

    // Pagination result for reviews
    const pagination = {
      total: totalReviews,
      pages: Math.ceil(totalReviews / limit),
      currentPage: page,
      limit,
    };

    res.json({
      success: true,
      data: {
        ...book.toObject(),
        averageRating,
        reviews,
        reviewsPagination: pagination,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search books by title or author
 * @route   GET /api/search
 * @access  Public
 */
const searchBooks = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Please provide a search query",
      });
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Search using text index or regex for partial matches
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
      ],
    })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count
    const total = await Book.countDocuments({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
      ],
    });

    // Pagination result
    const pagination = {
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      limit,
    };

    res.json({
      success: true,
      pagination,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  searchBooks,
};
