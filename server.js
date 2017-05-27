// Require all dependencies
const express    = require('express'),
      http       = require('http'),
      mongoose   = require('mongoose'),
      io         = require('socket.io'),
      Twit       = require('twit'),
      config     = require('./config')
	  streamHandler = require('./streamHandler');

// Create an express instance and set a port variable
const app  = express(),
      port = process.env.PORT || 8080;

// Connect to the mongo database
mongoose.connect(config.mongolab);

// Start the server
const server = http.createServer(app).listen(port, () => {
      console.log('Express server listening on port' + port);
});

// Set socket.io to listen on server
io.listen(server);

// Create a new Twit instance
const T = new Twit(config.twitter);

// Creating a request variable and using stream function from Twit
// The hashtags we'r listening are #golf and/or #hole19golf
const request = T.stream('statuses/filter', { track: '#hole19golf, #golf' })

// Set a stream listener for tweets matching tacking keywords
request.on('tweet', tweet => {
      streamHandler(tweet, io);
      console.log(tweet)
});