import { json } from "express";

const JsonCheckMiddleWare = (req, res, next) => {
	json({
		extended: true,
		verify: (_req, res, buf, _encoding) => {
			try {
				JSON.parse(buf);
			} catch (e) {
				res.status(404).json({ status: 'ko', message: 'invalid JSON' });
				throw Error('invalid JSON');
			}
		},
	})
	next()
}

export default JsonCheckMiddleWare