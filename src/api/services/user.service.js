const bcrypt = require('bcrypt');
const { responseBody } = require('../utils/response');
const { User } = require('../models');
const APIError = require('../errors/api.error');
const generateToken = require('./token.generator');
const { Op } = require("sequelize");

exports.login = async (request) => {
    const { username, password } = request.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
        throw new APIError({
            message: 'Incorrect username or password.',
            status: 404
        })
    }

    const isValid = await user.validPassword(password);

    if (!isValid) {
        throw new APIError({
            message: 'Incorrect username or password.',
            status: 404
        })
    }

    return {
        status: 200,
        message: 'Login successfully.',
        data: generateToken(
            {
                id: user.id
            },
            {
                number: 1,
                unit: 'hour',
                expires_in: '1h'
            }
        )
    };
}

exports.getAllUsers = async (request) => {
    const users = await User.findAll({ attributes: { exclude: ['password', 'updatedAt'] } });

    return { status: 200, message: 'Users successfully retrieved.', data: users };
}

exports.getUser = async (request) => {
    const { id } = request.params;

    if (id === null || id === undefined) {
        throw new APIError({
            message: 'Id is required',
            status: 422
        })
    }

    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password', 'updatedAt'] } });

    if (!user) {
        throw new APIError({
            message: 'User not found.',
            status: 404
        })
    }

    return { status: 200, message: 'User successfully retrieved.', data: user };
}

exports.createUser = async (request) => {
    const { username } = request.body;

    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
        throw new APIError({
            message: 'Username already exists.',
            status: 404
        })
    }

    let user = await User.create(request.body);
    user = user.toJSON();
    delete user.password;

    return { status: 200, message: 'User successfully created.', data: user };
}

exports.updateUser = async (request) => {
    const { id } = request.params;
    const { username } = request.body;

    const existingUser = await User.findOne({ where: { id: { [Op.not]: id }, username } });

    if (existingUser) {
        throw new APIError({
            message: 'Username already exists.',
            status: 404
        })
    }

    let user = await User.update(request.body, { where: { id } });

    if (user[0] === 0) {
        throw new APIError({
            message: 'Update failed. Please check the id of the user you are updating.',
            status: 422
        })
    }

    user = await User.findOne({ where: { id } });
    return { status: 200, message: 'User successfully updated.', data: user };
}

exports.deleteUser = async (request) => {
    const { ids } = request.body;

    const user = await User.destroy({ where: { id: { [Op.in]: ids } } });

    if (user === 0) {
        throw new APIError({
            message: 'Delete failed. Please check the id of the user you are deleting.',
            status: 422
        });
    }

    return { status: 200, message: 'User successfully delete.', data: [] };
}