var mongoose = require('../../util/dbconnect');
var Schema = mongoose.Schema;


var LocationSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50
    },

    city: {
      type: String,
      maxlength: 40
    },

    state: {
      type: String,
      maxlength: 30
    },

    country: {
      type: String,
      maxlength: 30
    },

    contacts: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]


});

module.exports = mongoose.model('location', LocationSchema);
