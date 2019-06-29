module.exports = {


    friendlyName: 'Login',


    description: 'Login mbr.',


    inputs: {
        id: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Application retreived'
        },
        appNotFound: {
            statusCode: 404,
            description: 'Application not found'
        },
        invalidLogin: {
            statusCode: 400,
            description: 'Invalid Credentials'
        }
    },


    fn: async function (inputs, exits) {
        console.log(inputs);
        let user = await User.findOne({ username: inputs.id, password: inputs.password });
        if (undefined === user || null === user) {
            return exits.invalidLogin({ message: 'Invalid Credentials' });
        }
        console.log(user);
        let app = await Application.findOne({ name: user.name });
        if (undefined === app || null === user) {
            return exits.appNotFound({ message: 'No application found' });
        }
        return exits.success({ app });

    }


};
