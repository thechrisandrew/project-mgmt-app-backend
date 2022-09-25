const { model, Schema, Types } = require("mongoose");

const clientSchema = new Schema({
	name: String,
	email: String,
	phone: String,
	createdAt: String,
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = model("Client", clientSchema);
