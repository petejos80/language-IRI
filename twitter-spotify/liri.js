// STEP 1
// Require the dotenv package in order to pull environment variables from your .env file
require("dotenv").config();

// STEP 2
// Declare an action variable equal to process.argv[2] - this will be used in the swtch statement below
// The song variable is used for song name in the spotify function, EX: node liri.js spotify-this-song 'hello'
var action = process.argv[2];
var song = process.argv[3];

// STEP 3
/* Use a switch statement to invoke either the twitter function or the spotify function, for instance
execute node liri.js my-tweets to invoke the twitter function, or node liri.js spotify-this-song 'SONGNAME'
to invoke the spotify function */
switch (action) {
    case "my-tweets":
    twitterFunction();
    break;
    
    case "spotify-this-song":
    spotifyFunction();
    break;
    }



// FUNCTION 1
// TWITTER FUNCTION - Copied and pasted directly from https://www.npmjs.com/package/twitter
function twitterFunction() {

    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
      });
       
      var params = {screen_name: 'nodejs'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // Use a for-loop to iterate through the API response data
            for( var i=0; i<tweets.length; i++) {
                console.log(tweets[i].text);
            }
        }
    });
}

// FUNCTION 2
// SPOTIFY FUNCTION - Copied and pasted directly from https://www.npmjs.com/package/spotify
function spotifyFunction() {
    
    var spotify = require('spotify');
 
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
        return;
        }
        // console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        console.log(data);
    });
    
}