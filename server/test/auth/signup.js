import { expect } from 'chai';
import User from 'server/models/User';
import { post } from 'server/test/utils';
import * as ErrorCodes from 'server/errors/codes';

const url = '/api/auth/sign-up';
const password = 123456790;

describe('Auth: Sign Up',  () => {
    it('should successfully sign up', async () => {
        const email = 'signUp.success@aaa.bbb';
        const res = await post(url, {email, password, passwordConfirmation: password});
        const user = await User.findOne({email});

        expect(res).to.have.status(201);
        expect(res.headers['set-cookie']).to.be.an('array').to.have.lengthOf(1);
        expect(user).to.be.an('object').that.is.not.empty;
        expect(user.email).to.equal(email);
    });

    it('should fail if user with same email already exists', async () => {
        const email = 'signUp.fail.duplicateEmail@aaa.bbb';
        const res = await post(url, {email, password, passwordConfirmation: password});
        expect(res).to.have.status(201);

        const res2 = await post(url, {email, password, passwordConfirmation: password});
        expect(res2).to.have.status(400);
        expect(res2.body.errors.email).to.equal(ErrorCodes.USER_ALREADY_EXISTS);
    });

    it('should fail if password confirmation does not match password', async () => {
        const email = 'signUp.fail.invalidPasswordConfirm@aaa.bbb';
        const res = await post(url, {email, password, passwordConfirmation: 'some_other_password'});
        expect(res).to.have.status(400);
        expect(res.body.errors.passwordConfirmation).to.equal(ErrorCodes.INVALID_VALUE);
    });

    it('should fail if email is invalid', async () => {
        const email = 'not_an_email';
        const res = await post(url, {email, password, passwordConfirmation: password});
        expect(res).to.have.status(400);
        expect(res.body.errors.email).to.equal(ErrorCodes.INVALID_VALUE);
    });

    it('should fail if some values are empty', async () => {
        const res = await post(url, {email: null, password: null, passwordConfirmation: null});

        expect(res).to.have.status(400);
        expect(res.body.errors.email).to.equal(ErrorCodes.INVALID_VALUE);
        expect(res.body.errors.password).to.equal(ErrorCodes.INVALID_VALUE);
        expect(res.body.errors.passwordConfirmation).to.equal(ErrorCodes.INVALID_VALUE);
    });

    it('should fail if password is shorter than 6 symbols', async () => {
        const email = 'signUp.fail.shortPassword@aaa.bbb';
        const password = 'short';
        const res = await post(url, {email, password, passwordConfirmation: password});

        expect(res).to.have.status(400);
        expect(Object.keys(res.body.errors)).to.have.lengthOf(1);
        expect(res.body.errors.password).to.equal(ErrorCodes.INVALID_VALUE);
    });
});