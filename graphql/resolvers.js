const userResolvers = require("./resolvers/userResolvers");
const clientResolvers = require("./resolvers/clientResolvers");

const customTypeResolvers = require("./resolvers/customTypeResolvers");

module.exports = {
	Query: {
		hello: () => {
			return "Hello World!";
		},
		...userResolvers.Query,
		...clientResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
		...clientResolvers.Mutation,
	},
	...customTypeResolvers,
};
