var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Cloud Native demo March 12th 2020' });
});

module.exports = router;
