/*
* Author: Pascal Tene
* Created: 20 Dec 2016
*/

var Organization = require('./organization.model');

exports.post = function(req, res, next) {
  var organization = new Organization(req.body.organization);
  organization.save((err, organization) => {
    if(err){
      console.log(err);
      res.json({'saved':false});
    } else {
      console.log(organization);
      res.json(organization);
    }
  });

  console.log("######################");
  console.log(req.body);
};


exports.get = function(req, res, next) {
  Organization.find({})
    .populate('head contacts', 'firstName lastName email')
    .exec()
    .then((organizations) => {
      res.json(organizations);
    })
    .catch((err) => {
      console.log(err);
      res.json({'organizations':false});
    });
};
