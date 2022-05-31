import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "server";

chai.should();
chai.use(chaiHttp);

export async function get(url, params) {
    return chai.request(app)
        .get(url)
        .query(params);
}

export async function post(url, data) {
    return chai.request(app)
        .post(url)
        .set('content-type', 'application/json')
        .send(data);
}

