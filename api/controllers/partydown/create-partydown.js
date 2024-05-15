module.exports = {
  friendlyName: 'Create partydown',

  description: '',

  inputs: {},

  exits: {
    success: {
      responseType: 'redirect',
    },
  },

  fn: async function (inputs) {
    const partydown = await Partydown.create({
      owner: this.req.session.userId,
    }).fetch()
    return `/${partydown.publicId}`
  },
}
