module.exports = {
  sync: true,

  friendlyName: 'Extract title from partydown',

  description: '',

  inputs: {
    content: {
      type: 'ref',
      description: 'The Markdown content from which to extract the title.',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function ({ content }) {
    const match = content.match(/^#\s*(.*)$/m)
    if (match && match[1]) {
      return match[1].trim()
    }
    return null
  },
}
