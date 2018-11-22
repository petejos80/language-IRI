require("dotenv").config();

// GLOBAL VARIABLES //
// =========================================================================================
var fs = require("fs");
var keys = require('./keys.js')
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");

/* Assign values to process.argv[2] and process.argv[3]
For examples, consider the following command: node liri.js spotify-this-song Hello
In the above example, spotify-this-song = process.argv[2] and Hello = process.argv[3] */
var action = process.argv[2];
var value = process.argv[3];

// Used in function to automatically add a "+" to searches with multiple words
var nodeArgs = process.argv;


// SWITCH CASE //
/* The switch-case directs which function gets run depending on which 'switch case' string
is called from the command line at the process.argv[3] position */
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
  doWhatItSays();
  break;
}

// Compensate for spaces between words by automatically adding a "+" symbol 
for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {
  
      value = value + "+" + nodeArgs[i];
  
    }
  
    else {
  
      value += nodeArgs[i];
  
    }
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

    var spotify = new Spotify(keys.spotify);

    // Set the variable 'value' equal to 4th word in command line
    var value = process.argv[3];

    spotify.search({ type: 'track', query: value, limit: '1' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else {
            // To view JSON in structured format, use the templay from the line below ˅
            // console.log('Song Name: ' + JSON.stringify(data.tracks.items[0], null, "\t")); 
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Song Name: ' + data.tracks.items[0].name); 
            console.log('Preview URL: ' + data.tracks.items[0].href); 
            console.log('Album Name: ' + data.tracks.items[0].album.name); 
        }
      });
      
    }

// Function 3/4 - Movie OMDB
function movieFunction() {
    
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=full&tomatoes=true&apikey=trilogy";
  console.log(queryUrl);
    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);
    
    request(queryUrl, function(error, response, body) {
    
      // If the request is successful
      if (!error && response.statusCode === 200) {
    
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        var jsonData = JSON.parse(body);

        // console.log("Release Year: " + response.body);
        console.log("Title: " + jsonData.Title);
        console.log("Release Year: " + jsonData.Year);
 
        // Use a function to loop through ratings array and only pick out Rotten Tomatoes review
        jsonData.Ratings.map( function (element) {
          console.log(element);
          console.log(jsonData.Ratings)
            if(element.Source === 'Rotten Tomatoes')
            console.log(element.Source + '\t' + 'Rating: ' + element.Value);
        });

        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);

      }
    });
}

// Function 4/4 - do-what-it-saus
var doWhatItSays = function() {
  // Use FS to analuyze contents of random.txt file
  fs.readFile('./random.txt', 'utf8', function (err, data) {
    if (err) throw err;

    var dataArr = data.split(',');

    if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      pick(dataArr[0]);
    }

  });

function processDoWhat () {
  console.log(doWhatItSays);
}
}


// NOTES

    // console.log("IMDB Rating: " + jsonData.imdbRating);
    // console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
    // for(var i=0; i < jsonData.Ratings.length; i++) {
    //   if(jsonData.Ratings[i].Source === 'Rotten Tomatoes')
    //   console.log('Website:' + jsonData.Ratings[i].Source + '\t' + 'Rating: ' + jsonData.Ratings[i].Value);
    // }