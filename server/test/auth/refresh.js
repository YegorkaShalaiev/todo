import { expect } from 'chai';

import User from "server/models/User";
import Token from "server/models/Token";
import tokenService from 'server/services/TokenService';

import { get, post } from 'server/test/utils';

const url = '/api/auth/refresh';

describe('Auth: Refresh',  () => {
    const email = 'refresh.test@aaa.bbb';
    const password = 1234567890;

    let user, refreshTokenCookie;

    before(async () => {
        const res = await post('/api/auth/sign-up', {email, password, passwordConfirmation: password});
        user = await User.findOne({email});
        refreshTokenCookie = res.headers['set-cookie'][0];
    });

    it('Should successfully refresh token', async () => {
        const res = await get(url, null, refreshTokenCookie);

        expect(res).to.have.status(200);
        const newRefreshToken = res.headers['set-cookie'][0].match(/refreshToken=(.+); Max-Age=/)[1];
        expect(newRefreshToken).to.be.a('string').that.is.not.empty;
    });

    it('Should throw error if token was not found in db', async () => {
        const tokenInDb = await Token.findOne({user: user._id});

        await tokenInDb.updateOne({refreshToken: 'some_other_token'});

        const res = await get(url, null, refreshTokenCookie);

        expect(res).to.have.status(401);
    });

    it('Should throw error if user with id from token payload does not exist', async () => {
        const fakeIdToken = await tokenService.generateToken({id: 'fakeIdBlahBlahBlah'}, 'REFRESH');

        const res = await get(url, null, fakeIdToken);

        expect(res).to.have.status(401);
    });
});