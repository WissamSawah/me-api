var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const payload = { email: "user@example.com" };
const jwtSecret = "averylongpassword";
const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h'});

const reports = require("../modules/reports.js");

function checkTokens(req, res, next) {
    console.log("checking token");
    const token = req.headers['x-access-token'];

    jwt.verify(token, jwtSecret, function(err, decoded) {
        console.log(err);
        if (err) {
            return res.status(401).json({
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

router.get('/week/:week', function(req, res, next) {
    reports.getWeeklyReport(res, req.params.week);
});

router.get('/get-weeknumbers', function(req, res, next) {
    reports.getWeeknumbers(res);
});


module.exports = router;
