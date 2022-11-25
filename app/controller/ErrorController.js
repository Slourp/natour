import AppError from "../models/AppError.js"
import { HttpStatusCode } from "../Utils/HttpStatusCode.js"

const isDevMod = () => {
	const { NODE_ENV } = process.env
	console.log()
	return ['development', "debug"].includes(NODE_ENV)
}

const sendErrorDev = async (err, _req, res) => {

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

	if (err.name === 'CastError') err = handleCastErrorDB(err);

	// Operationnal, trusted error: send message to client
	if (err.isOperational) {

		res.status(err.statusCode).json({
			status: err.status,
			message: err.message
		})
	}
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


export const globalErrorHandler = (err, req, res, _next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';


	if (isDevMod()) return sendErrorDev(err, req, res)

	let error = { ...err }
	if (error.name === 'CastError') error = handleCastErrorDB(error)
	sendErrorProd(err, res)

}
