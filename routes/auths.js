var express = require('express');
var router = express.Router();

const auths = require("../modules/auths.js");

router.post('/register', (req, res) => auths.register(res, req.body));
router.post('/login', (req, res) => auths.login(res, req.body));

module.exports = router;
