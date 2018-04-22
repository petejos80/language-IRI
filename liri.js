require("dotenv").config();

var fs = require("fs");

var keys = require('./keys.js')

// var spotify = require('spotify');
var Twitter = require('twitter');
// var omdb = require('omdb');

var client = new Twitter(keys.twitter);

var params = {screen_name: 'WaffleHouse'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);
    for( var i=0; i<tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log(' ');
        console.log(tweets[i].text);
    }
  }
});

