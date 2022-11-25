const requestTimeMiddleware = (req, _res, next) => {
	req.requestTime = Date.now()
	next()
}

export default requestTimeMiddleware