// Require all dependencies
const express       = require('express'),
      http          = require('http'),
      mongoose      = require('mongoose'),
      Twit          = require('twit'),
      config        = require('./config'),
      routes        = require('./routes'),
      streamHandler = require('./streamHandler');

// Create an express instance and set a port variable
const app  = express(),
      port = process.env.PORT || 3005;

// Connect to the mongo database
mongoose.connect(config.mongolab);

// Start the server
const server = http.createServer(app).listen(port, () => {
      console.log('Express server listening on port ' + port);
});

// Index route
app.get('/getTweets', routes.index);

// Page route
app.get('/page/:page/:skip', routes.page);


// Set socket.io to listen on server
let io = require('socket.io')(server);

// Create a new Twit instance
const T = new Twit(config.twitter);

// Creating a request variable and using stream function from Twit
// The hashtags we'r listening are #golf and/or #hole19golf
const request = T.stream('statuses/filter', { track: '#hole19golf, #golf' });

// Set a stream listener for tweets matching tacking keywords
request.on('tweet', tweet => {
      streamHandler(tweet, io)
      console.log(tweet)
});