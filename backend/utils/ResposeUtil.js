class ResponseUtil {
    static success(res, data, message = 'Success') {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    }

    static error(res, message = 'Error occurred', statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message,
            data: null
        });
    }

    static unauthorized(res, message = 'Unauthorized access') {
        return res.status(401).json({
            success: false,
            message,
            data: null
        });
    }
}

module.exports = ResponseUtil;