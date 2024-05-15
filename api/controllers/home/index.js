module.exports = {
  friendlyName: 'Home',

  description: 'Home index.',

  inputs: {
    publicId: {
      type: 'string',
    },
  },

  exits: {
    success: {
      responseType: 'inertia',
    },
    notFound: {
      responseType: 'notFound',
    },
  },

  fn: async function ({ publicId }) {
    if (!publicId)
      return {
        page: 'index',
        props: { message: 'Open a partydown or create one.' },
      }
    const partydown = await Partydown.findOne({ publicId })
    if (!partydown) throw 'notFound'
    return {
      page: 'index',
      props: {
        partydown,
      },
    }
  },
}
