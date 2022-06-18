import { expect } from 'chai';

import { post } from 'server/test/utils';
import * as ErrorCodes from 'server/errors/codes';
import User from "../../models/User";

const url = '/api/auth/login';
const password = 123456790;

describe('Auth: Login',  () => {
    let email;

    beforeEach(async () => {
        email = `login${Math.random()*1000000}@aaa.bbb`;
        await post('/api/auth/sign-up', {email, password, passwordConfirmation: password});
        const user = await User.findOne({email});

        expect(user).to.be.an('object').that.is.not.empty;
    });

    it('Should successfully login', async () => {
        const res = await post(url, {email, password, passwordConfirmation: password});

        expect(res).to.have.status(200);
        expect(Object.keys(res.body).length).to.be.equal(1);
        expect(res.body.accessToken).to.be.a('string');
        expect(res.headers['set-cookie']).to.be.an('array').to.have.lengthOf(1);
        expect(res.headers['set-cookie'][0].split('=')[0]).to.be.equal('refreshToken');
    });

    it(`should fail if user with same email doesn't exist`, async () => {
        const email = 'someFakeEmail@aaa.bbb';
        const res = await post(url, {email, password});

        expect(res).to.have.status(400);
        expect(res.body.errors.email).to.equal(ErrorCodes.USER_DOES_NOT_EXIST);
    });

    it('should fail if password is invalid', async () => {
        const res = await post(url, {email, password: 'invalid_password'});
        expect(res).to.have.status(401);
        expect(res.text).to.equal(ErrorCodes.NOT_AUTHORIZED);
    });

    it('should fail if email is invalid', async () => {
        const res = await post(url, {email: 'not_an_email', password});

        expect(res).to.have.status(400);
        expect(Object.keys(res.body.errors)).to.have.lengthOf(1);
        expect(res.body.errors.email).to.equal(ErrorCodes.INVALID_VALUE);
    });

    it('should fail if some values are empty', async () => {
        const res = await post(url, {email: null, password: null});

        expect(res).to.have.status(400);
        expect(Object.keys(res.body.errors)).to.have.lengthOf(2);
        expect(res.body.errors.email).to.equal(ErrorCodes.INVALID_VALUE);
        expect(res.body.errors.password).to.equal(ErrorCodes.INVALID_VALUE);
    });
});