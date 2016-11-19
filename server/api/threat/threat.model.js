var mongoose = require('../../util/dbconnect');
var Schema = mongoose.Schema;

var ThreatSchema = new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
      maxlength: 50
    },

    description: {
      type: String,
      maxlength: 100
    },
});

module.exports = mongoose.model('threat', ThreatSchema);
