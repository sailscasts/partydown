module.exports = {
  friendlyName: 'Signup',

  description: 'Signup auth.',

  inputs: {
    fullName: {
      type: 'string',
      required: true,
    },
    emailAddress: {
      type: 'string',
      isEmail: true,
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    badSignupRequest: {
      responseType: 'badRequest',
      description:
        'The provided fullName, password and/or email address are invalid.',
    },
    success: {
      responseType: 'redirect',
    },
  },

  fn: async function ({ fullName, emailAddress, password }) {
    const unverifiedUser = await Creator.create({
      fullName,
      emailAddress,
      password,
      tosAcceptedByIp: this.req.ip,
      emailVerificationCode: sails.helpers.generateVerificationCode(),
      emailVerificationCodeExpiresAt:
        Date.now() + sails.config.custom.emailVerificationCodeTTL,
    })
    return '/verify-email'
  },
}
