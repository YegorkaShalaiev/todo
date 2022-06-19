import { expect } from 'chai';

import User from "server/models/User";
import Token from "server/models/Token";

import { post } from 'server/test/utils';

const url = '/api/auth/logout';

describe('Auth: Logout',  () => {
    const email = 'logout.test@aaa.bbb';
    const password = 1234567890;
    let user, refreshTokenCookie;

    before(async () => {
        await post('/api/auth/sign-up', {email, password, passwordConfirmation: password});
        user = await User.findOne({email});

        expect(user).to.be.an('object').that.is.not.empty;
    });

    beforeEach(async () => {
        const res = await post('/api/auth/login', {email, password});

        expect(res).to.have.status(200);
        expect(res.body.accessToken).to.be.a('string');
        expect(res.headers['set-cookie']).to.be.an('array').to.have.lengthOf(1);
        expect(res.headers['set-cookie'][0].split('=')[0]).to.be.equal('refreshToken');

        refreshTokenCookie = res.headers['set-cookie'][0];
    });

    it('Should successfully logout and clear refresh token cookie', async () => {
        const res = await post(url, null, refreshTokenCookie);

        expect(res).to.have.status(200);
        expect(res.headers['set-cookie'][0].split('=')[0]).to.be.equal('refreshToken');
        expect(res.headers['set-cookie'][0].split('=')[1]).to.be.equal('; Path');
    });

    it('Should delete refresh token from database after logout', async () => {
        const token = await Token.findOne({user});

        expect(token).to.be.an('object').that.is.not.empty;

        const res = await post(url, null, refreshTokenCookie);

        const tokenAfterLogout = await Token.findOne({user});

        expect(tokenAfterLogout).to.be.equal(null);
        expect(res).to.have.status(200);
    });

    it('Should send success response even if user has no refresh token', async () => {
        const res = await post(url); //no token provided

        expect(res).to.have.status(200);
    });
});