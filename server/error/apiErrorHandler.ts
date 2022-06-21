class apiErrorHandler extends Error {
    public status: number;

    constructor(status, message) {
        super();
        this.message = message
        this.status = status

    }
    static BadRequest(message){
        return new apiErrorHandler(400, message)
    }

    static Unauthorized(message){
        return new apiErrorHandler(401, message)
    }

    static Forbidden(message){
        return new apiErrorHandler(403, message)
    }

    static NotFound(message){
        return new apiErrorHandler(404, message)
    }

    static Internal(message){
        return new apiErrorHandler(500, message)
    }

}

export default apiErrorHandler
