const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Poll REST API Docs',
            version: '1.0.0',
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['../routes/includes/*.js', '../models/*.js'],
};

// exporting the swagger jsdoc with options configured
module.exports = swaggerJsdoc(options);
