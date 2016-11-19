var User = require('./user.model');
var _ = require('lodash');

var signToken = require('../../auth/authenticate.service').signToken;

exports.params = function(req, res, next, id) {
    User.findById(id)
        .select('-password') // -password removes the password from selected data
        .exec()
        .then(function(user) {
            if (!user) {
                next(new Error('No user with id: ') + id);
            } else {
                req.user = user;
                next();
            }
        }, function(err) {
            next(err);
        });
};

exports.get = function(req, res, next) {
    User.find({})
        .select('-password') // -password removes the password from selected data
        .exec()
        .then(function(users) {
            res.json(users);
        }, function(err) {
            next(err);
        });
};

exports.count = function(req, res, next) {
    User.find({})
        .select('-password') // -password removes the password from selected data
        .exec()
        .then(function(users) {
            res.json({"userCount" : users.length});
        }, function(err) {
            next(err);
        });
};

exports.getOne = function(req, res, next) {
	//the user was found by Id in params and added to req.
	var user = req.user;
	res.json(user);
};

exports.put = function(req, res, next) {
	var user = req.user;
	var update = req.body;
	//updated fieads will win during the merge as they are in the right of the
	//merge operation
	_.merge(user, update);
	user.save(function(err, saved) {
		if(err){
			next(err);
		} else {
			res.json(saved);
		}
	});
};

exports.post = function(req, res, next) {
	var newUser = new User(req.body.user);
  //Chek if a user with this username already exist
  User.findOne({'username': req.body.user.username}).then((user)=>{
    if(user){
      newUser.username = "ex"; //client side will find this and set user exists
      res.json(newUser);
    } else {
    	//the pre save from user model is called before the user is saved
    	//user Password is encrypted in pre save.
    	newUser.save(function(err, user){
    		if(err){
    			return next(err);
    		}
    		//no error
    		//var token = signToken(user._id);
    		//res.json({token: token});
        res.json(user);
    	});
    }
  }).catch((err) => {
    console.log(err);
  })

};

exports.delete = function(req, res, next) {
	req.user.remove(function(err, user) {
    console.log("Deleting user: "+user);
		if (err) {
			next(err);
		} else {
      console.log("Deleting user: "+user);
			res.json(user);
		}
	});
};

//when the user is looking for self
exports.me = function(req, res) {
	res.json(req.user.toJson()); //toJson is a function defined locally defined in the user model.
};
