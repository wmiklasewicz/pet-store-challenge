import supertest from 'supertest';
const swaggerBaseUrl = 'https://petstore.swagger.io/';
const baseUrl = 'https://petstore.swagger.io/v2';
const healthCheckRequest = supertest(swaggerBaseUrl);
const request = supertest(baseUrl);

module.exports = {
    healthCheckRequest,
    request
}