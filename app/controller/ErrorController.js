import { HttpStatusCode } from "../Utils/HttpStatusCode.js"



const isDevMod = () => {
	const { NODE_ENV } = process.env
	return NODE_ENV === "development"
}
const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	})
}

const sendErrorProd = (err, res) => {
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

export const globalErrorHandler = (err, _req, res, _next) => {
	err.statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER;
	err.status = err.status || 'error';


	isDevMod() ? sendErrorProd(err, res) : sendErrorDev(err, res)



}
