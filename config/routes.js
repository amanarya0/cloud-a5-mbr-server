/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    'POST /mbr/apply': 'mbr/apply',
    'POST /mbr/addinfo': 'mbr/addinfo',
    'POST /mbr/login': 'mbr/login',
    'POST /mbr/signup': 'mbr/signup',
    'POST /mbr/getinfo': 'mbr/getinfo'
};
