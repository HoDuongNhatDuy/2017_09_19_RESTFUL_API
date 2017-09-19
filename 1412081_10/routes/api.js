var express = require('express');
var router = express.Router();

var studentRoute = require('./api/students');

router.use("/student", studentRoute);

module.exports = router;
