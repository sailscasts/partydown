/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    fullName: {
      type: 'string',
      required: true,
      description: 'The full name of the user',
      columnName: 'full_name',
    },
    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'koo@sailsconf.com',
      columnName: 'email_address',
    },
    emailStatus: {
      type: 'string',
      isIn: ['unverified', 'verified'],
      defaultsTo: 'unverified',
      description: "The verification status of the user's email address.",
      columnName: 'email_status',
    },
    password: {
      type: 'string',
      description:
        "Securely hashed representation of the creator's login password",
      protect: true,
      minLength: 8,
      example: '$2a$12$ymX0WdZU9vc0nM3ftCxGn.6p3aIFvI4haSrr/Y8ByW2BfnzqI1M0y',
    },
    passwordResetCode: {
      type: 'string',
      description:
        "A unique code used to verify the creator's identity when recovering a password.  Expires after 1 use, or after a set amount of time has elapsed.",
      columnName: 'password_reset_code',
    },
    passwordResetCodeExpiresAt: {
      type: 'number',
      description:
        "A JS timestamp (epoch ms) representing the moment when this creator's `passwordResetToken` will expire (or 0 if the creator currently has no such token).",
      example: 1502844074211,
      columnName: 'password_reset_code_expires_at',
    },
    emailVerificationCode: {
      type: 'string',
      description:
        'A pseudorandom, probabilistically-unique code for use in our account verification emails.',
      columnName: 'email_verification_code',
    },
    emailVerificationCodeExpiresAt: {
      type: 'number',
      description:
        "A JS timestamp (epoch ms) representing the moment when this creator's `emailProofToken` will expire (or 0 if the creator currently has no such token).",
      example: 1502844074211,
      columnName: 'email_verification_code_expires_at',
    },
    tosAcceptedByIp: {
      type: 'string',
      description:
        'The IP (ipv4) address of the request that accepted the terms of service.',
      extendedDescription:
        'Useful for certain types of businesses and regulatory requirements (KYC, etc.)',
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Know_your_customer',
      columnName: 'tos_accepted_by_ip',
    },
    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    partydowns: {
      collection: 'partydown',
      via: 'owner',
    },
  },
  beforeCreate: async function (valuesToSet, proceed) {
    valuesToSet.password = await sails.helpers.passwords.hashPassword(
      valuesToSet.password
    )

    return proceed()
  },
}
