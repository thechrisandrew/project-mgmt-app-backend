const Client = require("../../models/Client");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
	Query: {
		client: async (_, { id }) => {
			try {
				const res = await Client.findById(id);
				return res;
			} catch (err) {
				throw new Error(err);
			}
		},
		clients: async (_, { amount }) => {
			try {
				const res = await Client.find().sort({ createdAt: -1 }).limit(amount);
				return res;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		createClient: async (_, { createClientInput: { name, email, phone } }, context) => {
			const user = checkAuth(context);

			const newClient = new Client({
				name,
				email,
				phone,
				createdAt: new Date().toISOString(),
				createdBy: user.id,
			});

			const res = await newClient.save();

			return {
				id: res.id,
				...res._doc,
			};
		},
		deleteClient: async (_, { id }, context) => {
			const user = checkAuth(context);
			return await Client.findByIdAndRemove(id);
		},
		editClient: async (_, { id, editClientInput }, context) => {
			const { name, email, phone } = editClientInput;
			const user = checkAuth(context);
			return await Client.findByIdAndUpdate(
				id,
				{
					$set: {
						name,
						email,
						phone,
					},
				},
				{ new: true }
			);
		},
	},
};
