var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

router.get('/',function(req,res){
  var newest_url = "https://www.ted.com/talks?sort=newest&language=ko";
  request(newest_url,function(error,response, body){
    if (error) throw error;

    var $ = cheerio.load(body);
    var tedElements = $("div#browse-results div.talk-link");
    var item_arr = [];
    tedElements.each(function() {
      var $this = $(this);

      var link_url = "https://www.ted.com" + $this.find("a").attr('href');
      var thumbnail_src = $this.find(".thumb__image").attr('src');
      var time_duration = $this.find(".thumb__duration").text().trim();
      var speaker = $this.find(".talk-link__speaker").text();
      var title = $this.find(".media__message a.ga-link").text().trim();
      var rated = $this.find(".meta__row .meta__val").text().trim();
      var rated_arr = rated.replace(",","").split(" ");

      var item_detail_tmp ={
        link_url : link_url , thumbnail_src : thumbnail_src , time_duration : time_duration ,
        speaker : speaker , title : title , rated : rated_arr
      };
      item_arr.push(item_detail_tmp);
    });
    var result_json ={
      topic : "recommendation" , request_url : newest_url , items : item_arr
    }
    res.json(result_json);
  })
})
.get('/:topic',function(req,res){
  var choiced_topic = req.params.topic;
  var crawling_target_url = "https://www.ted.com/talks?language=ko&sort=newest&topics%5B%5D="+choiced_topic+"&duration=0-6";

  request(crawling_target_url, function(error, response, body) {
   if (error) throw error;

  var $ = cheerio.load(body);
  var tedElements = $("div#browse-results div.talk-link");
  var item_arr = [];
  tedElements.each(function() {
    var $this = $(this);

    var link_url = "https://www.ted.com" + $this.find("a").attr('href');
    var thumbnail_src = $this.find(".thumb__image").attr('src');
    var time_duration = $this.find(".thumb__duration").text().trim();
    var speaker = $this.find(".talk-link__speaker").text();
    var title = $this.find(".media__message a.ga-link").text().trim();
    var rated = $this.find(".meta__row .meta__val").text().trim();
    var rated_arr = rated.replace(",","").split(" ");

    var item_detail_tmp ={
      link_url : link_url , thumbnail_src : thumbnail_src , time_duration : time_duration ,
      speaker : speaker , title : title , rated : rated_arr
    };
    item_arr.push(item_detail_tmp);
  });
  var result_json ={
    topic : choiced_topic , request_url : crawling_target_url , items : item_arr
  }
  res.json(result_json);
});

})

module.exports = router;
