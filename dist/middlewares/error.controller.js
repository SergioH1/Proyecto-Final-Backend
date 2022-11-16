const errors = {
    ValidationError: 406,
    CastError: 422,
    UserError: 404,
    UserAuthorizationError: 401,
    TokenError: 401,
    RangeError: 505,
};
export const errorControl = (error, req, resp, next) => {
    req;
    next;
    let status = 500;
    if (error.name)
        status = errors[error.name];
    resp.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.send(JSON.stringify(result));
};
