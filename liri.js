require("dotenv").config();


// GLOBAL VARIABLES //
// =========================================================================================
var fs = require("fs");
var keys = require('./keys.js')
// var spotify = require('spotify');
var spotify = require('node-spotify-api');
var Twitter = require('twitter');
// var omdb = require('omdb');
var request = require("request");
var action = process.argv[2];
var value = process.argv[3];


// SWITCH CASE //
// The switch-case will direct which function gets run.
// =========================================================================================
switch (action) {
case "my-tweets":
  twitterFunction();
  break;

case "spotify-this-song":
  spotifyFunction();
  break;

case "movie-this":
  movieFunction();
  break;

case "do-what-it-says":
  doFunction();
  break;
}


// FUNCTIONS // 
// In this app, there are 4 different functions that are called using the switch cases above.
// ==========================================================================================

// Function 1/4 - Twitter
function twitterFunction() {

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
    })
};

// Function 2/4 - Spotify
function spotifyFunction() {

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(keys.spotify);

    var value = process.argv[3];

    spotify.search({ type: 'track', query: value, limit: '1' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else {
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            // console.log('Song Name: ' + JSON.stringify(data.tracks.items[0], null, "\t")); 
            console.log('Song Name: ' + value); 
            console.log('Preview URL: ' + data.tracks.items[0].preview_url); 
        }
      });
      
    }