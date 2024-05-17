/**
 * Partydown.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'partydowns',
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    title: {
      type: 'string',
      defaultsTo: 'Untitled',
    },
    content: {
      type: 'ref',
      defaultsTo: '# New Partydown',
    },
    shareId: {
      type: 'string',
      allowNull: true,
      columnName: 'share_id',
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    owner: { model: 'user' },
  },
  beforeCreate: async function (valuesToSet, proceed) {
    valuesToSet.publicId = sails.helpers.generateId()
    valuesToSet.title = sails.helpers.extractTitleFromPartydown(
      valuesToSet.content
    )
    return proceed()
  },
  beforeUpdate: async function (valuesToSet, proceed) {
    valuesToSet.title = sails.helpers.extractTitleFromPartydown(
      valuesToSet.content
    )
    return proceed()
  },
}
