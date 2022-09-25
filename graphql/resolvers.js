const userResolvers = require("./resolvers/userResolvers");
const clientResolvers = require("./resolvers/clientResolvers");

const customTypeResolvers = require("./resolvers/customTypeResolvers");
const projectResolvers = require("./resolvers/projectResolvers");

module.exports = {
	Query: {
		hello: () => {
			return "Hello World!";
		},
		...userResolvers.Query,
		...clientResolvers.Query,
		...projectResolvers.Query,
	},
	Mutation: {
		...userResolvers.Mutation,
		...clientResolvers.Mutation,
		...projectResolvers.Mutation,
	},
	...customTypeResolvers,
};
