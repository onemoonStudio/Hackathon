var express = require('express');

var main = require('./main');
var home = require('./home');
var test = require('./test');

var router_ctl = {
  main : main ,
  home : home ,
  test : test
}



module.exports = router_ctl;
