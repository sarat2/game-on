var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.send('get games');
});

router.get("/:id", function (req, res) {
    res.send('get game(' + req.params.id);
});

module.exports = router;