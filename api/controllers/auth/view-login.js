module.exports = {
  friendlyName: 'View auth/login',

  description: 'Display auth/login page',

  exits: {
    success: {
      responseType: 'inertia'
    }
  },

  fn: async function () {
    return { page: 'auth/login' }
  }
}
