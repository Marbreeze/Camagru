
var express = require("express");
var router = express.Router();





router.get("/", function(req, res, next) {
    console.log('someone made a request!');
    
    res.json({success: true, message: "API is working properly"});
});

module.exports = router;