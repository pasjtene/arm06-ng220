var mongoose = require('../../util/dbconnect');
var Schema = mongoose.Schema;

// installing bcrypt might be tricky on windows:
//npm install --production windows-build-tools --save
//npm install  node-gyp --save
//then npm install bcrypt --save
//https://github.com/nodejs/node-gyp#installation

var bcrypt = require('bcrypt');

var UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		maxlength: 14,
		required: true
	},

	password: {
		type: String,
		maxlength: 255,
		required: true
	},

  firstName: {
    type: String,
		maxlength: 20
  },

  lastName: {
    type: String,
		maxlength: 20
  },

  email: {
    type: String,
		maxlength: 30
  },

  organization: {
    type: String,
		maxlength: 80
  },

  location: {
    type: String,
		maxlength: 50
  }
});

//To be executed before saving the user

UserSchema.pre('save', function(next){
	if(!this.isModified('password')) {
		console.log("Pre save completed colling next: Save...");
		return next();
	}
	this.password = this.encryptPassword(this.password);
	console.log("Pre save completed colling next: Save...");
	next();
});

UserSchema.methods = {
	authenticate: function(plainTextPassword) {
		return bcrypt.compareSync(plainTextPassword, this.password);
	},

	encryptPassword: function(plainTextPassword) {
		if(!plainTextPassword) {
			console.log("No plainTextPassword...");
			return 'jt.pas';
		} else {
			var salt = bcrypt.genSaltSync(10);
			console.log("plainTextPassword...");
			return bcrypt.hashSync(plainTextPassword, salt);
		}
	},

	//This turns the user into a simple json object, removes speciffic mongoose properties,
	//and removes the password from the user object before returning it.
	toJson: function() {
		var obj = this.toObject();
		delete obj.password;
		return obj;
	}
};

module.exports = mongoose.model('user', UserSchema);
