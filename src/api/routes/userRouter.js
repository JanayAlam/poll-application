const router = require('express').Router();
const {
    getAllHandler,
    getHandler,
    putHandler,
} = require('../controllers/userController');
const validateBody = require('../middleware/validatorsMiddleware/bodyValidationMiddleware');
const objectIdValidatorMiddleware = require('../middleware/validatorsMiddleware/objectIdValidatorMiddleware');
const reqModels = require('../models/request-models');

// GET: /api/v1/users
router.get('/', getAllHandler);

// GET: /api/v1/users/:id
router.get('/:id', objectIdValidatorMiddleware, getHandler);

// PUT: /api/v1/users/:id
router.put(
    '/:id',
    objectIdValidatorMiddleware,
    validateBody(reqModels.userRequestModel),
    putHandler
);

// exporting the routes
module.exports = router;
