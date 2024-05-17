module.exports = {
  friendlyName: 'Share parydown',

  description: '',

  inputs: {
    publicId: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {},
    notFound: {
      responseType: 'notFound',
    },
  },

  fn: async function ({ publicId }) {
    const sharedPartydown = await Partydown.updateOne({ publicId }).set({
      shareId: sails.helpers.generateId(),
    }).select['shareId']

    if (!sharedPartydown) throw 'notFound'

    const shareUrl = `${sails.config.custom.baseUrl}/s/${sharedPartydown.shareUrl}`
    return {
      shareUrl,
    }
  },
}
