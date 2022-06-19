import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "server";

chai.should();
chai.use(chaiHttp);

export async function get(url, params, cookies = null) {
    return cookies
        ?
        chai.request(app).get(url).set('Cookie', cookies).query(params || '')
        :
        chai.request(app).get(url).query(params || '');
}

export async function post(url, data, cookies = null) {
    return cookies
        ?
        chai.request(app).post(url).set('Cookie', cookies).set('content-type', 'application/json').send(data || {})
        :
        chai.request(app).post(url).set('content-type', 'application/json').send(data || {});
}

