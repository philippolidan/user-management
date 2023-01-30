const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const loginValidation = require("../validations/login.validation");
const userValidation = require("../validations/create_update_user.validation");
const deleteValidation = require("../validations/delete_user.validation");
const { authBearer } = require("../middlewares/auth");
const { validate } = require("express-validation");
require('express-router-group')

router
    .route('/login')
    .post(
        validate(
            loginValidation,
            {},
            { abortEarly: false }),
        userController.login);

router
    .route('/login')
    .post(
        validate(
            loginValidation,
            {},
            { abortEarly: false }),
        userController.login);

// Route group for authenticated endpoints
router.group('/', authBearer, router => {
    router
        .route('/')
        .get(
            userController.getAllUsers
        )

    router
        .route('/')
        .post(
            validate(
                userValidation,
                {},
                { abortEarly: false }
            ),
            userController.createUser
        )

    router
        .route('/:id')
        .get(
            userController.getUser
        )

    router
        .route('/:id')
        .patch(
            validate(
                userValidation,
                {},
                { abortEarly: false }
            ),
            userController.updateUser
        )

    router
        .route('/delete')
        .delete(
            validate(
                deleteValidation,
                {},
                { abortEarly: false }
            ),
            userController.deleteUser
        )
})

module.exports = router;
