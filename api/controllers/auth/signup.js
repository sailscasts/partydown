module.exports = {
  friendlyName: 'Signup',

  description: 'Signup auth.',

  inputs: {
    fullName: {
      type: 'string',
      minLength: 8,
      required: true,
    },
    emailAddress: {
      type: 'string',
      isEmail: true,
      required: true,
    },
    password: {
      type: 'string',
      minLength: 8,
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
    try {
      const unverifiedUser = await User.create({
        fullName,
        emailAddress: emailAddress.toLowerCase(),
        password,
        tosAcceptedByIp: this.req.ip,
        emailVerificationCode: sails.helpers.generateCode(),
        emailVerificationCodeExpiresAt:
          Date.now() + sails.config.custom.emailVerificationCodeTTL,
      }).fetch()

      await sails.helpers.mail.send.with({
        subject: `${unverifiedUser.emailVerificationCode} is your verification code`,
        template: 'email-verify-account',
        to: unverifiedUser.emailAddress,
        templateData: {
          verificationCode: unverifiedUser.emailVerificationCode,
          fullName: unverifiedUser.fullName,
        },
      })
    } catch (error) {
      sails.log(error)
      if (error.name === 'UsageError') {
        throw {
          badSignupRequest: {
            problems: [`"signup" ${error.message}`],
          },
        }
      }
      throw {
        badSignupRequest: {
          problems: [
            `"signup" Apologies, but something went wrong with signing you up. Please try again.`,
          ],
        },
      }
    }
    return '/verify-email'
  },
}
