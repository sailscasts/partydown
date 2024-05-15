module.exports = {
  friendlyName: 'Login',

  description: 'Login auth.',

  inputs: {
    emailAddress: {
      isEmail: true,
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    rememberMe: {
      type: 'boolean',
      defaultsTo: false,
    },
  },

  exits: {
    success: {
      description: 'The requesting user agent has been successfully logged in.',
      responseType: 'redirect',
    },
    badCombo: {
      responseType: 'badRequest',
    },
  },

  fn: async function ({ emailAddress, password, rememberMe }) {
    const user = await User.findOne({
      emailAddress: emailAddress.toLowerCase(),
    })

    if (!user) {
      throw {
        badCombo: {
          problems: [{ login: 'Wrong email/password.' }],
        },
      }
    }

    try {
      await sails.helpers.passwords.checkPassword(password, user.password)
    } catch (e) {
      sails.log.error(e.message)
      throw {
        badCombo: {
          problems: [{ login: 'Wrong email/password.' }],
        },
      }
    }

    if (rememberMe) {
      this.req.session.cookie.maxAge =
        sails.config.custom.rememberMeCookieMaxAge
    }

    this.req.session.userId = user.id

    return '/'
  },
}
