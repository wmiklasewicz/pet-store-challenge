import { request, healthCheckRequest } from '../helpers/request';
const comparer = require('lodash');

function validatePetServiceAvailability() {
    return healthCheckRequest
        .get(`/`)
        .then(response => {
            expect(response.status).toEqual(200);
        });
};

function notFoundPetById(baseEndpoint, petId, headers) {
    return request
        .get(`${baseEndpoint}/${petId}`)
        .set(headers)
        .expect("Content-Type", /json/)
        .expect(404)
        .then(response => {
            expect(response.body.type).toEqual('error');
            expect(response.body.message).toContain('Pet not found');
        })
        .catch(e => {
            console.error('Error' + e.message);
        });

}

function successFindPetById(baseEndpoint, petId, headers, payload) {
    return request
        .get(`${baseEndpoint}/${petId}`)
        .set(headers)
        .expect("Content-Type", /json/)
        .expect(200)
        .then(response => {
            comparer.isEqual(response.body, payload);
        })
        .catch(e => {
            console.error('Error' + e.message);
        });
}

module.exports = {
    validatePetServiceAvailability,
    notFoundPetById,
    successFindPetById
};