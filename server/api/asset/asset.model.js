/*
*Author Pascal Tene.
*Created: Nov 02  2016
*last Updated: 02 Nov 2016.
This is the main Asset definition file. All asset fields and associated constraints must be defined in this file
*/

var mongoose = require('../../util/dbconnect');
var Schema = mongoose.Schema;

var AssetSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },

  uniqueIdNumber: {
    type: String,
    required: true,
    unique: true,
    maxLength: 24
  },

  cost: { //purchase price of the asset
    type: Number
  },

  currentValue: {
    type: Number
  },

    dateCreated: {
      type: Date,
      default: Date.now
  },

  datePurchased: {
    type: Date
  },

  isActive: {
    type: Boolean
  },

  activeStartDate: {
    type: Date
  },

  location: {
    type: Schema.Types.ObjectId,
    ref: 'location'
  },

  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },

  manufacturer: {
    type: String //should be of Company or location type: TO DO
  },

  risks: [{ //A risk profile will be assigned to assets that are risk managed
    type: Schema.Types.ObjectId,
    ref: 'risk'
  }],

    description: {
      type: String,
      maxlength: 100
    }


});


module.exports = mongoose.model('asset', AssetSchema);
