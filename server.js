const express = require('express'),
      mongoose = require('mongoose'),
      twitter = require('twit'),
      config = require('./config');

const app = express(),
      port = process.env.PORT || 8080;
