'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitySchema = new Schema({
  name: String,
  imageURL: String,
  description: String
});

module.exports = mongoose.model('City', CitySchema);
