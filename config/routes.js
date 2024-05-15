/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/
  'GET /:publicId?': 'home/index',
  'POST /partydowns': 'partydown/create-partydown',
  'PUT /partydowns/:publicId': 'partydown/update-partydown',
  'DELETE /partydowns/:publidId': 'partydown/delete-partydown',

  // Auth
  'GET /login': 'auth/view-login',
  'POST /login': 'auth/login',

  'GET /signup': 'auth/view-signup',
  'POST /signup': 'auth/signup',

  'GET /verify-email': 'auth/view-verify-email',
  'POST /verify-email': 'auth/verify-email',

  'GET /reset-password': 'auth/view-reset-password',
  'GET /reset-password': 'auth/reset-password',
}
