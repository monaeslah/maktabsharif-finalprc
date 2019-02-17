var express = require('express');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/panel*', (req, res)=> {
  res.sendFile('index.html',{root : path.join(__dirname,'../panel/build')} );
});
module.exports = router;
