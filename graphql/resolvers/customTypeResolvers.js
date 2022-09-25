const User = require("../../models/User");

module.exports = {
	Client: {
		createdBy: async (parent) => {
			return await User.findById(parent.createdBy);
		},
	},
};
