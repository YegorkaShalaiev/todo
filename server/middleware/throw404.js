import ApiError from "server/errors/ApiError";

export default () => {
    throw ApiError.NotFoundError();
}
