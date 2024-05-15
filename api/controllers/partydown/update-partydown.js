module.exports = {
  friendlyName: 'Update partydown',

  description: '',

  inputs: {
    publicId: {
      type: 'string',
      required: true,
    },
    content: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      responseType: 'inertiaRedirect',
    },
    notFound: {
      responseType: 'notFound',
    },
  },

  fn: async function ({ publicId, content }) {
    const updatedPartydown = await Partydown.updateOne({
      publicId,
    }).set({
      content,
    })
    if (!updatedPartydown) throw 'notFound'
    return `/${updatedPartydown.publicId}`
  },
}
