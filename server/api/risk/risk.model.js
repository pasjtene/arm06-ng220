/*
*Author: Pascal Tene
*Date created: Nov 02, 2016
*Last Modified: Nov 02, 2016
*/
var mongoose = require('../../util/dbconnect');
var Schema = mongoose.Schema;

//A Risk is the probability of a threat becoming real, and corresponding potential damage. (low, medium, High, Severe)
//A risk should be associated to a Threat, which is any entity able to exploit a vulnerability to make a risk become real
var RiskSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50
    },

    probability: {
      type: String,
      enum: ['Severe', 'High', 'Medium', 'Low']
    },

    status: {
      Type: String,
      enum: ['Accepted', 'Reduced', 'Transferred', 'Rejected']
    },

    threats: [{ //A thread can exploit a vulnerability and make a risk become real
        type: Schema.Types.ObjectId,
        ref: 'threat'
      }],

    exposureFactor: { //EF: This is a subjective potential percentage of loss to a specific asset if a specific threat is realized.
      type: Number,
      min: 0,
      max: 100
    },

    singleLossExpectancy: { //SLE = Asset Value x Exposure Factor. divide by 100 if EF is a number between 0 and 100
      type: Number
    },

    annualizedRateOfOccurrence: { // (ARO) : the estimated frequency at which a given threat is expected to occur.
      type: Number
    },

    annualizedLossExpectancy: { //(ALE) =	Single Loss Expectancy (SLE) x Annualized Rate of Occurrence (ARO)
      Type: Number
    },

    description: {
      type: String,
      maxlength: 100
    }
});

module.exports = mongoose.model('risk', RiskSchema);
