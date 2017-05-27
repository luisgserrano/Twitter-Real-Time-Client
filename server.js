const express = require('express'),
      Twit = require('twit'),
      config = require('./config');

const app = express(),
      port = process.env.PORT || 8080;

const T = new Twit(config.twitter);

const request = T.stream('statuses/filter', { track: '#golf' })

request.on('tweet', tweet => {
    console.log(tweet)
});
