const { expect } = require('chai');
const sinon = require('sinon');

const Book = require('../../src/models/Book');
const Reservation = require('../../src/models/Reservation');
const Booking = require('../../src/models/Booking');

const { updateBookStatus } = require('../../src/utils/bookUpdater');

describe('updateBookStatus() Unit Test', () => {
    let bookFindByIdStub;
    let bookingFindOneStub;
    let reservationFindOneStub;
    let bookUpdateOneStub;

    beforeEach(() => {
        bookFindByIdStub = sinon.stub(Book, 'findById');
        bookingFindOneStub = sinon.stub(Booking, 'findOne');
        reservationFindOneStub = sinon.stub(Reservation, 'findOne');
        bookUpdateOneStub = sinon.stub(Book, 'updateOne');
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should throw an error if the Book does not exist", async () => {
        const bookId = '123';

        bookFindByIdStub.resolves(null);

        try {
            await updateBookStatus(bookId);
        } catch (error) {
            expect(error.message).to.include('cannot be found');
            return;
        }

        throw new Error('Expected function to throw an error but did not.');
    });

    it('should set book status to "borrowed" when a borrow record exists', async () => {
        const bookId = '123';

        bookFindByIdStub.resolves({ _id: bookId });
        bookingFindOneStub.resolves({ bookId, returnDate: null });
        reservationFindOneStub.resolves(null);

        await updateBookStatus(bookId);

        expect(bookUpdateOneStub.calledWith(
            { _id: bookId },
            { status: 'borrowed' }
        )).to.be.true;
    });

    it('should set book status to "reserved" when no borrow but a reservation exists', async () => {
        const bookId = '123';

        bookFindByIdStub.resolves({ _id: bookId });
        bookingFindOneStub.resolves(null);
        reservationFindOneStub.resolves({ bookId });

        await updateBookStatus(bookId);

        expect(bookUpdateOneStub.calledWith(
            { _id: bookId },
            { status: 'reserved' }
        )).to.be.true;
    });

    it('should set book status to "available" when no borrow or reservation exists', async () => {
        const bookId = '123';

        bookFindByIdStub.resolves({ _id: bookId });
        bookingFindOneStub.resolves(null);
        reservationFindOneStub.resolves(null);

        await updateBookStatus(bookId);

        expect(bookUpdateOneStub.calledWith(
            { _id: bookId },
            { status: 'available' }
        )).to.be.true;
    });

});