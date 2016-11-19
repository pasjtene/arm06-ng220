/*
*Author Pascal Tene.
*Created: Oct 12  2016
*last Updated: 10 Nov 2016.
Stats Model definition file
*/

var mongoose = require('../../util/dbconnect');
var Schema = mongoose.Schema;

var StatSchema = new Schema({
  obj: {
    type: text,
    required: true,
    maxlength: 20
  },
  quantity: {
    type: number,
    required: true
  }
});

module.exports = mongoose.model('stats', StatSchema);
