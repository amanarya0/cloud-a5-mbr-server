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

        let user = User.findOne({ id: inputs.id, password: inputs.password });
        if (null === user) {
            return exits.invalidLogin({ message: 'Invalid Credentials' });
        }
        let app = Application.findOne({ name: user.name });
        if (null === app) {
            return exits.appNotFound({ message: 'No application found' });
        }
        let response = {
            response: {
                id: app.id,
                name: app.name,
                phone: app.phone,
                address: app.address,
                employer: app.employer,
                status: app.status
            }
        };
        return exits.success({ response });

    }


};
