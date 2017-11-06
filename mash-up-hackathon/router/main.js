var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/',function(req,res){
  var ha = new Date();
  console.log(ha);
  var hello = {
    this_is:"main",
    hello : "world"
  }
  res.json(hello);
})
.get('/history',function(req,res){
  res.send();
})
.get('/addition',function(req,res){
  res.send();
})
.post('/addition',function(req,res){
    var d = new Date();
    var today_date = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
    console.log(today_date);

    res.send('good');
})

module.exports = router;
