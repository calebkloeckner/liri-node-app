// functions
var fs = require("fs");
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var liriArgument = process.argv[2];
var keys = require("./keys.js");
console.log(keys);
// switch statement 

switch (liriArgument) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}

function movieThis() {
    var movie = process.argv[3];
    if (!movie) {
        movie = "mr nobody";
    }
    params = movie
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieInfo = JSON.parse(body);
            var movieResult = "\r\n" +
            
                "Title: " + movieInfo.Title + "\r\n" +
                "Year: " + movieInfo.Year + "\r\n" +
                "Imdb Rating: " + movieInfo.imdbRating + "\r\n" +
                "Country: " + movieInfo.Country + "\r\n" +
                "Language: " + movieInfo.Language + "\r\n" +
                "Plot: " + movieInfo.Plot + "\r\n" +
                "Actors: " + movieInfo.Actors + "\r\n" +
                "Rotten Tomatoes Rating: " + movieInfo.tomatoRating + "\r\n" +
                "Rotten Tomatoes URl:  " + movieInfo.tomatoUrl + "\r\n";
            console.log(movieResult);
        } else {
            console.log("Error: " + error);
            return;
        }

    });
};
function myTweets() {
var client = new Twitter({
  consumer_key: keys.twitter.consumer_key,
  consumer_secret: keys.twitter.consumer_secret,
  access_token_key: keys.twitter.access_token_key,
  access_token_secret: keys.twitter.access_token_secret
  });

//  can only get one tweet to display at a time. Based on the index it is at
  client.get('search/tweets', {q: 'calebkloeckner', count: 20}, function(error, tweets, response) {
    if (!error) {
        // for(var i = 0; i < 20; i++){
        //     return;
            console.log(tweets.statuses[0].created_at);
            console.log(tweets.statuses[0].text);
        // }      
    }
  });
};
 
function spotifyThisSong(){
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
      });
   spotify.search({ type: 'track', query: process.argv[3]}, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 console.log(data.tracks.items[0].artists[0].name);
});
 };
// Not sure the error i am recieving 
 function doWhatItSays() {
     fs.readFile("random.txt", "UTF8", function(error, data){
         if(!error) {
            // console.log(err);
                var doWhatItSaysResults = data.split(",");
                spotifyThisSong(doWhatItSaysResults[0]);
         } else {
             console.log("Error occured " + err)
         }
     });
 };

