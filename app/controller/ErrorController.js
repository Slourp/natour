import AppError from "../models/AppError.js"

const isDevMod = () => {
	const { NODE_ENV } = process.env

	return NODE_ENV === "development"
}

const sendErrorDev = async (err, req, res) => {

	res.status(err.statusCode || 500).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack
	});
}

const handleCastErrorDB = err => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

const sendErrorProd = (err, res) => {

	let error = { ...err }

	if (error.name === 'CastError') error = handleCastErrorDB(error);
	// if (error.code === 11000) error = handleDuplicateFieldsDB(error);
	// if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
	// if (error.name === 'JsonWebTokenError') error = handleJWTError();
	// if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

	// Operationnal, trusted error: send message to client
	err.isOperational ?
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message
		}) :

		/**
		 * Programming or  other unknow error: don't leak error details
		 *  
		 **/
		// 1) Log error
		console.error('ERROR 💥', err);
	// 2) Send generic message

	res.status(HttpStatusCode.INTERNAL_SERVER).json({
		status: 'error',
		message: "Something went very wrong"
	})
}


export const globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';


	isDevMod() ? sendErrorProd(err, res) : sendErrorDev(err, req, res)

}
