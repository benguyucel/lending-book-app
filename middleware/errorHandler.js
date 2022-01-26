module.exports = function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    const statusCode = err[0];
    const errorMessage = err[1];
    return res.status(statusCode).send({
        errorMessage
    }).end();
}