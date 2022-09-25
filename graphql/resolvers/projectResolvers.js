const Project = require("../../models/Project");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
	Query: {
		project: async (_, { id }) => {
			try {
				const res = await Project.findById(id);
				return res;
			} catch (err) {
				throw new Error(err);
			}
		},
		projects: async (_, { amount }) => {
			try {
				const res = await Project.find().sort({ createdAt: -1 }).limit(amount);
				return res;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		createProject: async (_, { createProjectInput: { name, description, status, clientId } }, context) => {
			const user = checkAuth(context);

			console.log(name);

			const newProject = new Project({
				name,
				description,
				status,
				createdAt: new Date().toISOString(),
				clientId,
			});

			const res = await newProject.save();

			return {
				id: res.id,
				...res._doc,
			};
		},
		deleteProject: async (_, { id }, context) => {
			const user = checkAuth(context);
			return await Project.findByIdAndRemove(id);
		},
		editProject: async (_, { id, editProjectInput }, context) => {
			const { name, description, status } = editProjectInput;
			const user = checkAuth(context);
			return await Project.findByIdAndUpdate(
				id,
				{
					$set: {
						name,
						description,
						status,
					},
				},
				{ new: true }
			);
		},
	},
};
