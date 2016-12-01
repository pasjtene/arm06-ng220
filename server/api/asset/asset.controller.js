/*jshint esversion: 6 */
/*
*Author Pascal Tene.
*Created: Nov 02  2016
*last Updated: Dec 01, 2016.
This is the main Asset definition file. All asset fields and associated constraints must be defined in this file
*/
var Asset = require('./asset.model');
var logger = require('../../util/logger2');
var _ = require('lodash');

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

/* Asset updated are handeled here.
req.body is the updated asset.
res.json(updated) returns a copy of the updated asset.
_ (lodash is used to merge updated fields with existing fields of the asset)
*/
exports.put = function(req, res, next) {
  var update = req.body;
  Asset.findById(req.body._id).then(asset => {
    if(!asset) {
      res.json("false");
    } else {
      _.merge(asset, update);
      asset.save((err, updated) => {
        if(err) {
          next(err);
        } else {
          res.json(updated);
        }
      })
    }
  })
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
