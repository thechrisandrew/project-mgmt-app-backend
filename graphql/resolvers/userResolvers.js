const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server-express");

const User = require("../../models/User");
const { validateRegisterInput, validateLoginInput } = require("../../utils/validators");

function generateToken(user) {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "1h" }
	);
}

module.exports = {
	Query: {},
	Mutation: {
		register: async (_, { registerInput }, context, info) => {
			const { username, email, password, confirmPassword } = registerInput;

			// Validate all user input
			const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);
			if (!valid) {
				throw new UserInputError("User input validation error", { errors });
			}

			// Checks if email or username exists
			const user = await User.findOne({ $or: [{ username }, { email }] });
			if (user) {
				throw new UserInputError(`the requested username or email has been taken`, {
					errors: {
						exists: "This username or email address has been registered",
					},
				});
			}

			const hashedPassword = await bcrypt.hash(password, 12);

			const newUser = new User({
				username,
				email,
				password: hashedPassword,
				createdAt: new Date().toISOString(),
			});

			const res = await newUser.save(); // Saves the new user to the database

			const token = generateToken(res);

			return {
				...res._doc,
				id: res.id,
				token,
			};
		},
		login: async (_, { username, password }, context, info) => {
			const { errors, valid } = validateLoginInput(username, password);

			if (!valid) {
				throw new UserInputError("User input validation error", { errors });
			}

			const user = await User.findOne({ username });

			if (!user) {
				throw new UserInputError("Invalid credentials", {
					errors: {
						credentials: "Invalid credentials",
					},
				});
			}

			const match = await bcrypt.compare(password, user.password);

			console.log(match);

			if (!match) {
				throw new UserInputError("Invalid credentials", {
					errors: {
						credentials: "Invalid credentials",
					},
				});
			}

			const token = generateToken(user);

			return {
				...user._doc,
				id: user.id,
				token,
			};
		},
	},
};
