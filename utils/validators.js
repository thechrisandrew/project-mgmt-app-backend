const Joi = require("joi");

module.exports.validateRegisterInput = (username, email, password, confirmPassword) => {
	let errors = [];

	const registerSchema = Joi.object().keys({
		username: Joi.string().trim().alphanum().min(3).max(30).required(),
		email: Joi.string().trim().email().required(),
		password: Joi.string().trim().min(8).required(),
		confirmPassword: Joi.string().trim().valid(Joi.ref("password")).required().messages({
			"any.only": `"password" must match`,
		}),
	});

	let data = { username, email, password, confirmPassword };

	const validationResult = registerSchema.validate(data, { abortEarly: false });
	// console.log(validationResult?.error?.details);
	if (validationResult?.error?.details) {
		validationResult?.error?.details.forEach((e) => {
			errors.push(e.message);
		});
	}
	const valid = Object.keys(errors).length < 1;
	// console.log(errors);

	return {
		errors,
		valid,
	};
};

module.exports.validateLoginInput = (username, password) => {
	let errors = [];

	const loginSchema = Joi.object().keys({
		username: Joi.string().trim().required(),
		password: Joi.string().trim().required(),
	});

	let data = { username, password };

	const validationResult = loginSchema.validate(data, { abortEarly: false });
	// console.log(validationResult?.error?.details);
	if (validationResult?.error?.details) {
		validationResult?.error?.details.forEach((e) => {
			errors.push(e.message);
		});
	}
	const valid = Object.keys(errors).length < 1;
	// console.log(errors);

	return {
		errors,
		valid,
	};
};
