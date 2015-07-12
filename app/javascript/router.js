'use sctrict';
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'photo/:id': 'photo'
    },
    start: function() {
        Backbone.history.start();
    },

    home: function() {
        Backbone.trigger('page:home');
    },

    photo: function(id) {
        Backbone.trigger('page:photo', id);
    }

});

module.exports = new Router();