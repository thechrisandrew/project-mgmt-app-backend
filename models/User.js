const { model, Schema } = require("mongoose");

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
	},
	password: String,
	createdAt: String,
});

module.exports = model("User", userSchema);
