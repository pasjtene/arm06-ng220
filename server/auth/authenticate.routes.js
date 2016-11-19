var router = require('express').Router();
var verifyUser = require('./authenticate.service').verifyUser;
var verifyPersistentUser = require('./authenticate.service').verifyPersistentUser;
var controller = require('./authenticate.controller');

router.post('/login', verifyUser(), controller.login);
router.post('/auth_check', verifyPersistentUser(), controller.login);

//testing only
router.get('/login', verifyUser(), controller.login);
module.exports = router;
