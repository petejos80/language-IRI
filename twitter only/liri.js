// STEP 1
// Require the dotenv package in order to pull environment variables from your .env file
require("dotenv").config();

// STEP 2
// If your process.argv[2] is equal to "show-tweets" then invoke twitterFunction
// To see this in action, execute this command in your terminal: node liri.js show-tweets
// In the example from the line above, node = process.argv[0], liri.js = process.argv[1], show-tweets = process.argv[2]
if (process.argv[2] === "show-tweets") {
    twitterFunction();
  }

// Declare the Twitter function.  This function gets called in the if-statement above in order to fetch tweets.
function twitterFunction() {

    // Method for collecting Tweets using NPM package - copied directly from https://www.npmjs.com/package/twitter
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
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        }
    });
}