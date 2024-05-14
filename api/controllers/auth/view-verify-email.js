module.exports = {
  friendlyName: 'View auth/verify-email',

  description: 'Display auth/verify-email page',

  exits: {
    success: {
      responseType: 'inertia'
    }
  },

  fn: async function () {
    return { page: 'auth/verify-email' }
  }
}
