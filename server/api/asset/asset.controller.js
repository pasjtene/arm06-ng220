/*jshint esversion: 6 */
/*
*Author Pascal Tene.
*Created: Nov 02  2016
*last Updated: 04 Nov 2016.
This is the main Asset definition file. All asset fields and associated constraints must be defined in this file
*/
var Asset = require('./asset.model');
var logger = require('../../util/logger2');

exports.params = function(req, res, next, id) {
    Asset.findById(id)
            .then((asset) => {
              if(!asset) {
                next(new Error('No asset with id: ',id));
              } else {
                req.asset = asset;
                next();
              }
            }, (err) => { next(err); });
};

exports.count = function(req, res, next) {
  Asset.find({})
        .populate('location')
        .exec()
        .then((assets) => res.json({"assetCount": assets.length}))
        .catch((err) => {
          logger.info("Error connecting to the database");
          res.json({"assets": false});
        });
};


exports.delete = function(req, res, next) {
  //asset was added in req by the exports.params fn.
    req.asset.remove(function(err, asset){
      if(err) {
        res.json({"deleted":false});
      } else {
        res.json(asset);
      }
    });
};

exports.post = function(req, res, next) {
  var newAsset = new Asset(req.body.asset);
  newAsset.save(function(err, asset){
    if(err){
      logger.error(err);
      res.json({"saved": false});
    } else {
      res.json(req.body.asset);
    }
  });
};

exports.get = function(req, res, next) {
  Asset.find({})
        .populate('location')
        .exec()
        .then((assets) => res.json(assets))
        .catch((err) => {
          logger.info("Error connecting to the database");
          res.json({"assets": false});
        });
};
