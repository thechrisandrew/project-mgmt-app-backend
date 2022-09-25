const { gql } = require("apollo-server-express");

module.exports = gql`
	type User {
		id: ID!
		username: String!
		email: String!
		token: String!
		createdAt: String!
	}
	input RegisterInput {
		username: String!
		email: String!
		password: String!
		confirmPassword: String!
	}
	type Client {
		id: ID!
		name: String!
		email: String!
		phone: String!
		createdAt: String!
		createdBy: User!
	}
	input CreateClientInput {
		name: String!
		email: String!
		phone: String!
	}
	input EditClientInput {
		name: String
		email: String
		phone: String
	}
	type Query {
		hello: String!
		client(id: ID!): Client
		clients(amount: Int): [Client]
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username: String!, password: String!): User!

		createClient(createClientInput: CreateClientInput): Client!
		deleteClient(id: ID!): Client
		editClient(id: ID!, editClientInput: EditClientInput): Client
	}
`;
