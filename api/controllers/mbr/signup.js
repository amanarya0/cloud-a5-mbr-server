const crypto = require("crypto");
module.exports = {


	friendlyName: 'Signup',


	description: 'Signup account.',


	inputs: {
		username: {
			type: "string",
			required: true
		},
		name: {
			type: "string",
			required: true
		},
		password: {
			type: "string",
			required: true,
			description: "New Password of the user"
		},
		confirmPwd: {
			type: "string",
			required: true,
			description: "Type in the password again."
		}
	},


	exits: {
		success: {
			statusCode: 200,
			description: "User created"
		},
		alreadyExists: {
			statusCode: 400,
			description: "User already exists with this username"
		},
		invalidRequest: {
			statusCode: 400,
			description: "Password Confirm password not matching"
		}
	},


	fn: async function (inputs, exits) {
		// Check password and confirm password equal or not
		if (inputs.password !== inputs.confirmPwd) {
			return exits.invalidRequest({ message: 'Password and Confirm Password don\'t match.' });
		}

		let hash = crypto.createHash("sha512");
		hash.update(inputs.password);

		let registerUser = {
			username: inputs.username,
			name: inputs.name,
			password: hash.digest("hex")
		};

		Object.assign(registerUser)

		// Create the user
		let createdUser = await User.findOrCreate(
			{
				username: inputs.username
			},
			registerUser
		);

		// Send success or fail depending if user was created or not.
		if (createdUser) {
			return exits.success({
				message: "User successfully created."
			});
		} else {
			return exits.invalidRequest({
				message: "Unable to create user."
			});
		}

	}


};