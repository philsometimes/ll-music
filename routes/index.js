var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Codelab Music', cellotap: "/cellotap" });
});

/* GET cellotap page. */
router.get ('/cellotap', function(req, res, next){
  res.render('cellotap', {title: "Cello Tap"});
});

module.exports = router;
