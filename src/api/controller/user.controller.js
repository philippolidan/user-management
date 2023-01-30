const userService = require("../services/user.service")
const { responseBody } = require("../utils/response")

exports.login = async (request, response, next) => {
    try {
        const token = await userService.login(request);

        return response
            .status(200)
            .send(
                responseBody(
                    200,
                    "Login successfully.",
                    token.data
                )
            )
    } catch (error) {
        next(error);
    }
}

exports.getAllUsers = async (request, response, next) => {
    try {
        const users = await userService.getAllUsers(request);

        return response
            .status(200)
            .send(
                responseBody(
                    200,
                    "Users successfully retrieved.",
                    users.data
                )
            )
    } catch (error) {
        next(error);
    }
}

exports.getUser = async (request, response, next) => {
    try {
        const user = await userService.getUser(request);

        return response
            .status(200)
            .send(
                responseBody(
                    200,
                    "User successfully retrieved.",
                    user.data
                )
            )
    } catch (error) {
        next(error);
    }
}

exports.createUser = async (request, response, next) => {
    try {
        const user = await userService.createUser(request);

        return response
            .status(200)
            .send(
                responseBody(
                    200,
                    "User successfully created.",
                    user.data
                )
            )
    } catch (error) {
        next(error);
    }
}

exports.updateUser = async (request, response, next) => {
    try {
        await userService.updateUser(request);

        return response
            .status(200)
            .send(
                responseBody(
                    200,
                    "User successfully updated."
                )
            )
    } catch (error) {
        next(error);
    }
}

exports.deleteUser = async (request, response, next) => {
    try {
        await userService.deleteUser(request);

        return response
            .status(200)
            .send(
                responseBody(
                    200,
                    "User successfully delete."
                )
            );
    } catch (error) {
        next(error);
    }
}
