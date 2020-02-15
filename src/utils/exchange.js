exports.successResponce = async function successResponce(
    req,
    res,
    message,
    successCode,
    payLoad,
) {
    return res
        .status(successCode)
        .json({
            success: true,
            message,
            payLoad,
        })
        .end();
};

exports.errorResponce = async function errorResponce(req, res, message, errorCode) {
    return res
        .status(errorCode)
        .json({
            success: true,
            message,
            errorCode,
            payLoad: {},
        })
        .end();
};
