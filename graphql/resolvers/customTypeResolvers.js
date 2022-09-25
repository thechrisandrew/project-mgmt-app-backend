const User = require("../../models/User");
const Client = require("../../models/Client");

module.exports = {
	Client: {
		createdBy: async (parent) => {
			return await User.findById(parent.createdBy);
		},
	},
	Project: {
		client: async (parent) => {
			return await Client.findById(parent.clientId);
		},
	},
	ProjectStatus: {
		NotStarted: "Not Started",
		InProgress: "In Progress",
		Completed: "Completed",
	},
};
