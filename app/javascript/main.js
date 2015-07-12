'use strict';
require('datejs');
var Backbone = require('Backbone');
var _ = require('underscore');
var $ = require('jquery');
require('gsap');
Backbone.$ = $;
var PagebleCollection = require('backbone.paginator');
var AppView = require('./views/app');
var Router = require('./router');
var PhotoCollection = require('./collections/photo_collection');

var App = {};
_.extend(App, Backbone.Events, {
    start: function() {
        this.appView = new AppView();
        this.loadData();
    },
    setupListeners: function() {
        this.listenTo(this.photos, 'sync', this.onLoadSuccess);
        this.listenTo(this.photos, 'error', this.onLoadError);
    },
    loadData: function() {
        var self = this;
        // Using YQL and JSONP
        $.ajax({
            url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&jsoncallback=?',

            // The name of the callback parameter, as specified by the YQL service
            jsonp: "jsonFlickrFeed",
            // Tell jQuery we're expecting JSONP
            dataType: "jsonp",
            // Work with the response
            success: function(response) {
                self.onLoadSuccess(response);
            },
            error: function(error) {
                self.onLoadError(error);
            }
        });
    },
    onLoadSuccess: function(response) {
        this.photos = new PhotoCollection(response.items, {
            mode: 'client'
        });
        this.appView.onPhotosLoaded(this.photos);
        Router.start();
    },

    onLoadError: function(error) {
        console.log('Application data could not load.');
    }
});

$(function() {
    App.start();
});