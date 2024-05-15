module.exports = {
  friendlyName: 'Verify email',

  description: '',

  inputs: {
    emailVerificationCode: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description:
        'Email address confirmed and requesting user logged in.  Since this looks like a browser, redirecting...',
      responseType: 'redirect',
    },
    invalidOrExpiredCode: {
      responseType: 'badRequest',
      description: 'The provided code is expired, invalid, or already used up.',
    },
  },

  fn: async function ({ emailVerificationCode }) {
    const user = await User.findOne({
      emailVerificationCode,
    })

    if (!user || user.emailVerificationCodeExpiresAt <= Date.now()) {
      throw {
        invalidOrExpiredCode: {
          problems: [
            `"verifyEmail" Email verification code is expired or doesn't exist.`,
          ],
        },
      }
    }

    await User.updateOne({ id: user.id }).set({
      emailStatus: 'verified',
      emailVerificationCode: '',
      emailVerificationCodeExpiresAt: 0,
    })

    this.req.session.userId = user.id

    return '/'
  },
}
