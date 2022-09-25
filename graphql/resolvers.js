const userResolvers = require("./resolvers/userResolvers");

module.exports = {
	Query: {
		hello: () => {
			return "Hello World!";
		},
		...userResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
	},
};
