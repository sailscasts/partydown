module.exports = {
  sync: true,

  friendlyName: 'Generate code',

  description: '',

  inputs: {
    size: {
      type: 'number',
      description: 'The length of the code to generate.',
      defaultsTo: 6,
    },
  },

  exits: {
    success: {
      description: 'Generated a random OTP successfully.',
    },
  },

  fn: function ({ size }) {
    const crypto = require('crypto')
    const digits = '0123456789'
    let code = ''

    for (let i = 0; i < size; i++) {
      const randomIndex = crypto.randomInt(0, 10)
      code += digits.charAt(randomIndex)
    }

    return code
  },
}
