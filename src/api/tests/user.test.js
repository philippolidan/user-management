const { faker } = require('@faker-js/faker');
const { createUser, getAllUsers, getUser, updateUser, deleteUser, login } = require("../services/user.service");
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
chai.use(chaiHttp);

let token = "";
describe("User Service Unit Tests", function () {
    describe("Create User functionality", function () {
        it("should successfully add a user if the username is not existing in the DB", async function () {
            const request = {
                body: {
                    first_name: faker.name.firstName(),
                    last_name: faker.name.lastName(),
                    address: faker.address.city(),
                    post_code: faker.address.zipCode(),
                    phone_number: faker.phone.number(),
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    password: faker.internet.password()
                }
            }

            const returnedUser = await createUser(request);

            chai.expect(returnedUser.data.first_name).to.equal(request.body.first_name);
            chai.expect(returnedUser.data.last_name).to.equal(request.body.last_name);
            chai.expect(returnedUser.data.address).to.equal(request.body.address);
            chai.expect(returnedUser.data.post_code).to.equal(request.body.post_code);
            chai.expect(returnedUser.data.phone_number).to.equal(request.body.phone_number);
            chai.expect(returnedUser.data.email).to.equal(request.body.email);
            chai.expect(returnedUser.data.username).to.equal(request.body.username);
        });

        it("should throw an error if the username already exists.", async function () {
            const request = {
                body: {
                    first_name: faker.name.firstName(),
                    last_name: faker.name.lastName(),
                    address: faker.address.city(),
                    post_code: faker.address.zipCode(),
                    phone_number: faker.phone.number(),
                    email: faker.internet.email(),
                    username: 'admin',
                    password: faker.internet.password()
                }
            }
            await createUser(request).catch((error) => {
                chai.expect(error.message).to.equal('Username already exists.');
            });
        });
    });

    describe("Get All Users functionality", function () {
        it("should successfully return the users", async function () {
            const returnedUser = await getAllUsers();

            chai.expect(returnedUser.status).to.equal(200);
        });
    });

    describe("Get User functionality", function () {
        it("should successfully return the users", async function () {
            const request = {
                params: {
                    id: 2
                }
            }
            const returnedUser = await getUser(request);

            chai.expect(returnedUser.status).to.equal(200);
            chai.expect(returnedUser.data).not.equal(null);
        });

        it("should throw an error if the users is not existing.", async function () {
            const request = {
                params: {
                    id: 124
                }
            }
            await getUser(request).catch((error) => {
                chai.expect(error.message).to.equal('User not found.');
            });
        });
    });

    describe("Update User functionality", function () {
        it("should successfully update the users.", async function () {
            const request = {
                params: {
                    id: 2
                },
                body: {
                    first_name: faker.name.firstName(),
                    last_name: faker.name.lastName(),
                    address: faker.address.city(),
                    post_code: faker.address.zipCode(),
                    phone_number: faker.phone.number(),
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    password: faker.internet.password()
                }
            }
            const returnedUser = await updateUser(request);

            chai.expect(returnedUser.data.first_name).to.equal(request.body.first_name);
            chai.expect(returnedUser.data.last_name).to.equal(request.body.last_name);
            chai.expect(returnedUser.data.address).to.equal(request.body.address);
            chai.expect(returnedUser.data.post_code).to.equal(request.body.post_code);
            chai.expect(returnedUser.data.phone_number).to.equal(request.body.phone_number);
            chai.expect(returnedUser.data.email).to.equal(request.body.email);
            chai.expect(returnedUser.data.username).to.equal(request.body.username);
        });

        it("should throw an error if the users is not existing.", async function () {
            const request = {
                params: {
                    id: 2214
                },
                body: {
                    first_name: faker.name.firstName(),
                    last_name: faker.name.lastName(),
                    address: faker.address.city(),
                    post_code: faker.address.zipCode(),
                    phone_number: faker.phone.number(),
                    email: faker.internet.email(),
                    username: faker.internet.userName(),
                    password: faker.internet.password()
                }
            }
            await updateUser(request).catch((error) => {
                chai.expect(error.message).to.equal('Update failed. Please check the id of the user you are updating.');
            });
        });

        it("should throw an error if the username already exists.", async function () {
            const request = {
                params: {
                    id: 2
                },
                body: {
                    first_name: faker.name.firstName(),
                    last_name: faker.name.lastName(),
                    address: faker.address.city(),
                    post_code: faker.address.zipCode(),
                    phone_number: faker.phone.number(),
                    email: faker.internet.email(),
                    username: 'admin',
                    password: faker.internet.password()
                }
            }
            await getUser(request).catch((error) => {
                chai.expect(error.message).to.equal('User not found.');
            });
        });
    });

    describe("Delete User functionality", function () {
        it("should successfully delete the users", async function () {
            const request = {
                body: {
                    ids: [3, 4, 5]
                }
            }
            const returnedUser = await deleteUser(request);

            chai.expect(returnedUser.status).to.equal(200);
        });

        it("should throw an error if the users is not existing.", async function () {
            const request = {
                body: {
                    ids: [312, 244, 522]
                }
            }
            await deleteUser(request).catch((error) => {
                chai.expect(error.message).to.equal('Delete failed. Please check the id of the user you are deleting.');
            });
        });
    });

    describe("Login User functionality", function () {
        it("should successfully login the user", async function () {
            const request = {
                body: {
                    username: 'admin',
                    password: 'password'
                }
            }
            const returnedUser = await login(request);

            chai.expect(returnedUser.status).to.equal(200);
            chai.expect(returnedUser.data.access_token).not.equal(null);
            token = returnedUser.data.access_token;
        });

        it("should throw an error if the credential is incorrect.", async function () {
            const request = {
                body: {
                    username: 'admin',
                    password: 'password1'
                }
            }
            await login(request).catch((error) => {
                chai.expect(error.message).to.equal('Incorrect username or password.');
            });
        });
    });
});