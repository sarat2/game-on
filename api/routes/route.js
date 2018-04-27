var express = require("express");
var router = express.Router();
var games = require("./games");

router.use(function (req, res, next) {
    console.log('Time: ', Date.now());
    next();
})

router.use("/types", function (req, res) {
    res.send('get types');
});

router.use("/games", games);

module.exports = router;