const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

module.exports = (context) => {
	const authHeader = context.req.headers.authorization;

	if (authHeader) {
		// Bearer ..........
		const token = authHeader.split("Bearer ")[1];

		if (token) {
			try {
				const user = jwt.verify(token, process.env.JWT_SECRET);
				return user;
			} catch (err) {
				throw new AuthenticationError("Invalid/Expired token provided");
			}
		}
		throw new Error("Invalid Authentication token format");
	}

	throw new Error("Authentication token must be provided");
};
