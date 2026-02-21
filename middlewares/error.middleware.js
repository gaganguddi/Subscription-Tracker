/*const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };

        error.message = err.message;

        console.error(err);

        // Mongoose bad ObjectId
        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose duplicate key
        if (err.code === 11000) {
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error' });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;*/

const errorMiddleware = (err, req, res, next) => {
    // Log the error for the developer
    console.error(err);

    // Create a copy of the error
    let error = { ...err };
    error.message = err.message;

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = new Error(message);
        error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new Error(message);
        error.statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        // We use err.errors (the original error) because the spread operator
        // doesn't copy nested object properties well
        const message = Object.values(err.errors).map(val => val.message);
        error = new Error(message.join(', '));
        error.statusCode = 400;
    }

    // Send the final response
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

export default errorMiddleware;