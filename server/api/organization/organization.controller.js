/*
* Author: Pascal Tene
* Created: 20 Dec 2016
*/

var Organization = require('./organization.model');

exports.params = function(req, res, next, id) {
  console.log("in Params...");
    Organization.findById(id).then((organization) => {
      if(!organization) {
        next(new Error("No organization with is: ",id));
      } else {
        req.organization = organization;
        console.log("in Params...", organization);
        next();
      }
    }, (err) => {next(err);});
};

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

exports.delete = function(req, res, next) {
  console.log("Deleting....", req.organization);
  req.organization.remove((err, organization) => {
    if(err) {
      res.json({"deleted":false});
    } else {
      res.json(organization);
    }
  })
}
