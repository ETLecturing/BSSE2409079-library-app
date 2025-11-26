require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { expect } = require('chai');
const bcryptor = require('../../src/utils/bcryptor');

let app;

const Member = require('../../src/models/Member');
const Book = require('../../src/models/Book');
const Reservation = require('../../src/models/Reservation');

describe('Integration Test: createReservation()', () => {
    let mongoServer;
    let memberId;
    let token;
    let bookId;

    before(async () => {

        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        await mongoose.connect(uri);

        app = require('../../src/app');

        app.set('io', {
            emit: () => {} // To prevent test from crashing
        });

        const member = await Member.create({
            name: 'Test',
            email: 'test@example.com',
            password_hash: await bcryptor.hashPassword('orFrtDZNX2BiBZR')
        });

        memberId = member._id;

        const book = await Book.create({
            title: 'How to Test',
            author: 'John Test',
            publisher: 'Test Publishing',
            year: '2010',
            genre: 'Instructional',
            language: 'English',
            imgUrl: 'how-to-test.png',
            status: 'available'
        });
        
        bookId = book._id;
    });

    it('log in and create a reservation successfully', async () => {
        const loginRes = await request(app)
            .post('/member/api/login')
            .send({ email: 'test@example.com', password: 'orFrtDZNX2BiBZR' });

        expect(loginRes.status).to.equal(200);
        expect(loginRes.body).to.have.property('token');

        const token = loginRes.body.token;

        const reserveRes = await request(app)
            .post(`/transaction/api/reserve/${bookId}`)
            .set('Authorization', `Bearer ${token}`);

        console.log("RESERVE RESPONSE:", reserveRes.status, reserveRes.body);

        expect(reserveRes.status).to.equal(201);
        expect(reserveRes.body.message).to.equal("Reservation created");

        const reservation = await Reservation.findOne({ memberId, bookId });
        expect(reservation).to.exist;
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

});