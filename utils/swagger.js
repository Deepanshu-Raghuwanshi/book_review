const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Review API",
      version: "1.0.0",
      description: "A RESTful API for a book review system",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format: Bearer <token>",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "User authentication endpoints",
      },
      {
        name: "Books",
        description: "Book management endpoints",
      },
      {
        name: "Reviews",
        description: "Review management endpoints",
      },
      {
        name: "Search",
        description: "Search functionality",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    authAction: {
      bearerAuth: {
        name: "bearerAuth",
        schema: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description:
            'JWT Authorization header using the Bearer scheme. Example: "Bearer {token}"',
        },
        value: "Bearer <JWT>",
      },
    },
    persistAuthorization: true,
  },
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Book Review API Documentation",
};

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs, swaggerOptions),
};
