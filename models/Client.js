const { model, Schema } = require("mongoose");

const clientSchema = new Schema({
	name: String,
	email: String,
	phone: String,
	createdAt: String,
	createdBy: String,
});

module.exports = model("Client", clientSchema);
