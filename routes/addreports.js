const reports = require("../modules/reports.js");

var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const payload = { email: "user@example.com" };
const jwtSecret = "averylongpassword";
const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h'});

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.addReport(res, req.body));

function checkToken(req, res, next) {
    console.log("checking token");
    const token = req.headers['x-access-token'];

    jwt.verify(token, jwtSecret, function(err, decoded) {
        console.log(err);
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 401,
                    source: "/reports",
                    title: "Unauthorized",
                    detail: err.message
                }
            });
        }
        // Valid token send on the request
        next();
    });
}

module.exports = router;
