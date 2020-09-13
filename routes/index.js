var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    const data = {
        data: [{
            msg: "Hej! mitt namn är Wissam Sawah. Jag är 24 år gammal, född och uppvuxen i Syrien, Damaskus." +
            "Jag flyttade till Sverige i slutet av oktober 2015 och har bott i stockholm/Lidingö sedan dess. Jag lärde mig språket i ungefär ett år, och jobbade som butikssäljare i en kläddbutik i Stockholm." +
            "Om jag skall nämna någon hobby så får det bli att trana på gymmet och kolla på serier." +
            "När det gäller intresse så har jag ett stort intresse för datorer och programmering. När jag blir klar med utbildningen vill jag jobba som en full-stack eller webbutvecklare."
        }]
    };

    res.json(data);
});

module.exports = router;
