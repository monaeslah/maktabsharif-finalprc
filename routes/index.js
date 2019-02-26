var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express1112' });
});
router.get('/front*',(req,res) => {
  res.sendFile('index.html', {root : path.join(__dirname, '../front/build/')})
  })
module.exports = router;
