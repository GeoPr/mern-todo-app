require('dotenv').config()
const config = require('../config/default')
const jwt = require('jsonwebtoken')

module.exports = async (request, response, next) => {
	if (request.method === 'OPTIONS') {
		return next()
	}

	try {
		const token = request.headers.authorization.split(' ')[1]

		if (!token) {
			return response.status(401).json({
				message: 'You`re not authed'
			})
		}

		const decoded = jwt.verify(token, config.jwtSecret)
		request.user = decoded

		next()
	} catch (e) {
		return response.status(401).json({
			message: 'You`re not authed'
		})
	}
}