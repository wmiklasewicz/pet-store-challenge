import { request } from '../helpers/request';
import { validatePetServiceAvailability, notFoundPetById, successFindPetById } from '../helpers/generic';
import { defineFeature, loadFeature } from 'jest-cucumber';

const faker = require('faker');
const feature = loadFeature('features/addingPet.feature');
const baseEndpoint = '/pet';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
};

const catImage = 'https://pixabay.com/images/id-1192026/';
const birdImage = 'https://pixabay.com/images/id-2046453/';
const fishImage = 'https://pixabay.com/images/id-1943755/';

defineFeature(feature, (test) => {
    const corePayload = {
        category: {
            id: faker.datatype.number({ min: 1, max: 20 }),
            name: "pets",
        },
        tags: [{
            id: faker.datatype.number({ min: 30, max: 40 }),
            name: faker.datatype.datetime(),
            },
        ],
    };

    test('Add a new pet to the petstore', ({ given, when, then }) => {
        const petId = faker.datatype.number({ min: 10, max: 1000 });
        const payload = {
            id: petId,
            name: faker.name.firstName(),
            photoUrls: [catImage],
            ...corePayload,
        };

        given('The petstore service is available', () => {
            validatePetServiceAvailability();
        });

        when('I add a new pet to the pet store', () => {
            return request
                .post(baseEndpoint)
                .send(headers)
                .send(payload)
                .expect("Content-Type", /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).not.toBe(null);
                    expect(typeof response.body).toBe('object');
                    expect(response.body.id).toEqual(petId);
                });
        });

        then('I can find my newly added pet in the petstore', () => {
            successFindPetById(baseEndpoint, petId, headers, payload);
        });
    });

    test('Add a new pet without image should fail', ({ given, when, then }) => {
        const petId = faker.datatype.number({ min: 1001, max: 2000 });
        const payload = {
            id: petId,
            name: faker.name.firstName(),
            ...corePayload,
        };

        given('The petstore service is available', () => {
            validatePetServiceAvailability();
        });

        when('I add a new pet without image', () => {
            return request
                .post(baseEndpoint)
                .set(headers)
                .send(payload)
                .expect("Content-Type", /json/)
                .expect(405)
                .then(response => {
                    expect(response.body).not.toBe(null);
                    expect(response.body.type).toEqual('error');
                });

        });

        then("I can't find my new pet in the petstore", () => {
            notFoundPetById(baseEndpoint, petId, headers);
        });
    });

    test('Add a new pet without name should fail', ({ given, when, then }) => {
        const petId = faker.datatype.number({ min: 2001, max: 3000 });
        const payload = {
            id: petId,
            photoUrls: [birdImage, fishImage, catImage],
            ...corePayload,
        };

        given('The petstore service is available', () => {
            validatePetServiceAvailability();
        });

        when('I add a new pet without name', () => {
            return request
                .post(baseEndpoint)
                .set(headers)
                .send(payload)
                .expect("Content-Type", /json/)
                .expect(405)
                .then(response => {
                    expect(response.body).not.toBe(null);
                    expect(response.body.type).toEqual('error');
                });
        });

        then("I can't find my new pet in the petstore", () => {
            notFoundPetById(baseEndpoint, petId, headers);
        });
    });

    test('Add a new pet with pending status', ({ given, when, then }) => {
        const petId = faker.datatype.number({ min: 3001, max: 4000 });
        const payload = {
            id: petId,
            name: faker.name.firstName(),
            photoUrls: [catImage, fishImage],
            status: "pending",
            ...corePayload,
        };

        given('The petstore service is available', () => {
            validatePetServiceAvailability();
        });

        when('I add a new pet with pending status', () => {
            return request
                .post(baseEndpoint)
                .send(headers)
                .send(payload)
                .expect("Content-Type", /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).not.toBe(null);
                    expect(response.body.status).toBe('pending');
                    expect(typeof response.body).toBe('object');
                });
        });

        then('I can find my new pet in the store with matching status data', () => {
            successFindPetById(baseEndpoint, petId, headers, payload);
        });
    });
});