module.exports = {
  friendlyName: 'View partydown/share-partydown',

  description: 'Display partydown/share-partydown page',

  inputs: {
    shareId: {
      type: 'string',
      required: true,
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

  fn: async function () {
    const sharedPartydown = await Partydown.findOne({ shareId })

    if (!sharedPartydown) throw 'notFound'

    return { page: 'partydown/shared-partydown', props: { sharedPartydown } }
  },
}
