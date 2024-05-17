module.exports = {
  sync: true,

  friendlyName: 'Generate public id',

  description: '',

  inputs: {
    size: {
      type: 'number',
      defaultsTo: 12,
    },
    alphabet: {
      type: 'string',
      defaultsTo:
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function ({ alphabet, size }) {
    const { customAlphabet } = require('nanoid')
    const nanoid = customAlphabet(alphabet, size)
    return nanoid(size)
  },
}
