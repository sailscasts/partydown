module.exports = {
  friendlyName: 'View auth/reset-password',

  description: 'Display auth/reset-password page',

  exits: {
    success: {
      responseType: 'inertia',
    },
  },

  fn: async function () {
    return { page: 'auth/reset-password' }
  },
}
