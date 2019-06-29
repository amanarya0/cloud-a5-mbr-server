module.exports = {


    friendlyName: 'Getinfo',


    description: 'Getinfo mbr.',


    inputs: {
        id: {
            type: 'string',
            required: true
        }
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
        userNotFound: {
            statusCode: 404,
            description: 'User not found'
        }
    },


    fn: async function (inputs, exits) {
        let user = await User.findOne({ username: inputs.id, password: inputs.password });
        if (undefined === user || null === user) {
            return exits.userNotFound({ message: 'User not found' });
        }
        let app = await Application.findOne({ name: user.name });
        if (undefined === app || null === user) {
            return exits.appNotFound({ message: 'No application found' });
        }
        return exits.success({ app });

    }


};