var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET home page. */
router.get('/url', function(req, res, next) {
  console.log('ok ' + req.query.url);
  res.send("ok");
});

module.exports = router;
