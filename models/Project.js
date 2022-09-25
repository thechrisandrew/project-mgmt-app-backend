const { model, Schema } = require("mongoose");

const projectSchema = new Schema({
	name: String,
	description: String,
	status: {
		type: String,
		enum: ["Not Started", "In Progress", "Completed"],
	},
	createdAt: String,
	clientId: {
		type: Schema.Types.ObjectId,
		ref: "Client",
	},
});

module.exports = model("Project", projectSchema);
