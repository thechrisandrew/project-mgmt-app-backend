require("dotenv").config();
const express = require("express");
const {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageDisabled,
	ApolloServerPluginLandingPageProductionDefault,
} = require("apollo-server-core");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const connectDB = require("./config/db");

connectDB(); //Make connection to database

async function startServer() {
	const app = express();

	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => ({ req }),
		settings: {
			"editor.theme": "light",
		},
		csrfPrevention: true,
		cache: "bounded",
		introspection: process.env.NODE_ENV === "development",
		playground: process.env.NODE_ENV === "development",
		plugins: [
			process.env.NODE_ENV === "development"
				? ApolloServerPluginLandingPageGraphQLPlayground()
				: ApolloServerPluginLandingPageProductionDefault({
						footer: false,
				  }),
		],
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({ app });

	app.use((req, res) => {
		res.send("Hello from express apollo server!");
	});

	const port = process.env.PORT || 4000;
	app.listen(port, () => {
		console.log(`Server is running in ${process.env.NODE_ENV} mode at http://localhost:${port}`);
		console.log(`GraphQL path: http://localhost:${port}${apolloServer.graphqlPath}`);
	});
}
startServer();
