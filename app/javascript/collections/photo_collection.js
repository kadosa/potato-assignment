'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var PhotoModel = require('../models/photo_model');

var PhotoCollection = Backbone.PageableCollection.extend({

    model: PhotoModel,

    state: {
        pageSize: 10
    }
});

module.exports = PhotoCollection;