import log from 'server/utils/log';

export default (err, req, res, next) => {
    log.error(err);
    res.status(err.status).send(err.message);
}