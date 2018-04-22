require("dotenv").config();


// GLOBAL VARIABLES //
// =========================================================================================
var fs = require("fs");
var keys = require('./keys.js')
var spotify = require('spotify');
var Twitter = require('twitter');
// var omdb = require('omdb');
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

    // var spotify = new Spotify(keys.spotify);

    var spotify = require('spotify');
    
    spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
            console.log("spotify works");
    });
}