/*
* Author: Pascal Tene
* Created: 20 Dec 2016
*/

var mongoose = require('../../util/dbconnect');
var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },

  id: {
    type: String,
    required: true,
    maxlength: 14,
    unique: true
  },

  head: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  contacts: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]

  }
);

module.exports = mongoose.model('organization', OrganizationSchema);
