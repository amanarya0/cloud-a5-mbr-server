module.exports = {


    friendlyName: 'Addinfo',


    description: 'Addinfo mbr.',


    inputs: {
        name: {
            type: 'string',
            required: false
        },
        employeeId: {
            type: 'string',
            required: false
        },
        address: {
            type: 'string',
            required: false
        },
    },


    exits: {
        success: {
            statusCode: 200,
            description: 'Application Created'
        },
        appNotFound: {
            statusCode: 404,
            description: 'Application not found'
        }
    },


    fn: async function (inputs, exits) {
        let app = null;
        if (null != inputs.name) {
            app = await Application.findOne({ name: inputs.name });

        }
        if (null === app) {
            return exits.appNotFound({ message: 'Application not found' });
        }
        await Application.update({ name: inputs.name }).set({ status: 'Application Processed Successfully' });

        return exits.success({ message: 'Information recieved and application updated' });

    }


};
