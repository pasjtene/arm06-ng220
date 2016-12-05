/*jshint esversion: 6 */
/*Author Pascal Tene
Created: Sep 2016
last modified: Dec 01 2016
*/
var Location = require('./location.model');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
    Location.findById(id)
            .then((location) => {
              if(!location) {
                next(new Error('No location with id: ',id));
              } else {
                req.location = location;
                next();
              }
            }, (err) => { next(err); });
};


exports.delete = function(req, res, next) {
    req.location.remove(function(err, location){
      if(err) {
        res.json({"deleted":false});
      } else {
        res.json(location);
      }
    });
};

exports.post = function(req, res, next) {
  var newLocation = new Location(req.body.location);
  console.log(JSON.stringify(req.body));
  newLocation.save(function(err, location){
    if(err){
      console.log("Could not save locaion: ",err);
      res.json({saved: false});
    } else {
      console.log("Location saved successfully: ", req.body.location);
      res.json(req.body.location);
    }
  });
};

exports.put = function(req, res, next) {
  var update = req.body.location;
  Location.findById(req.body.location._id).then(location => {
    if(!location) {
    console.log("Location not found: ",location);
  } else {
    _.merge(location, update);
    location.save((err, location) =>{
      if(err) {
        console.log("Error saving");
        res.json("false")
      } else {
        console.log("updated: ", location);
        res.json(location);

      }
    })
  }
  });

  //console.log(location.json());
  console.log("Updated location: ", req.body);
}


exports.get = function(req, res, next) {
  Location.find({})
    .populate('contacts', 'firstName lastName email') //Only firstName, lastName and email are included for user in location contact
    .exec()
    .then(
      (locations) => res.json(locations),

      (err) => {
      console.log("error connecting to the database");
      res.json({"locations": false});
    });
};
