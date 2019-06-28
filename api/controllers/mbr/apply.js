module.exports = {


    friendlyName: 'Apply',


    description: 'Apply mbr.',


    inputs: {
        name: {
            type: 'string',
            required: false
        },
        phone: {
            type: 'number',
            required: false
        },
        address: {
            type: 'string',
            required: false
        },
        employer: {
            type: 'string',
            required: false
        }
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Application Created'
        },
        missingParameter: {
            statusCode: 400,
            description: 'Missing information'
        },
        appAlreadyExists: {
            statusCode: 409,
            description: 'Application already present'
        }
    },


    fn: async function (inputs, exits) {

        let error = 'Missing information: ';
        let hasError = false;
        let existingApp = await Application.findOne({ name: inputs.name });
        if (null != existingApp) {
            return exits.appAlreadyExists({ message: 'Application already present' });
        }
        if (null === inputs.name) {
            hasError = true;
            error += 'name, ';
        }
        if (null === inputs.phone) {
            hasError = true;
            error += 'phone number, ';
        }
        if (null === inputs.address) {
            hasError = true;
            error += 'address, ';
        }
        if (null === inputs.employer) {
            hasError = true;
            error += 'employer name';
        }
        if (hasError) {
            return exits.missingParameter({ message: error });
        }

        let app = await Application.create({ name: inputs.name, address: inputs.address, phone: inputs.phone, employer: inputs.employer, status: 'Awaiting information from employer' }).fetch();
        return exits.success({ message: 'Your application is created successfuly with id: ' + app.id + '. Login to view the application status.' });
    }


};
