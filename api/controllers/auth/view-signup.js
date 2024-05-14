module.exports = {
  friendlyName: 'View auth/signup',

  description: 'Display auth/signup page',

  exits: {
    success: {
      responseType: 'inertia'
    }
  },

  fn: async function () {
    return { page: 'auth/signup' }
  }
}
