module.exports = {
  friendlyName: 'Logout',

  description: 'Logout auth.',

  inputs: {},

  exits: {
    success: {
      responseType: 'inertiaRedirect',
    },
  },

  fn: async function (inputs) {
    delete this.req.session.userId
    sails.inertia.flushShared('loggedInUser')
    return '/login'
  },
}
