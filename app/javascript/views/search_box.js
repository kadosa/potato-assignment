'use sctrict';
var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var template = require('../templates/search_box');
Backbone.$ = $;

var SearchBox = Backbone.View.extend({
    className: 'search-box',
    events: {
        'keyup input': 'onKeyUp'
    },
    prevValue: '',

    initialize: function(options) {
        _.bindAll(this, 'onKeyUp');
    },

    render: function() {
        this.$el.append(template());
        return this.$el;
    },

    /**
     * If user typed in at least 3 characters,
     * trigger an event with the value.
     * @param  {[type]} event jQuery keyup event
     */
    onKeyUp: function(event) {
        var searchString = event.currentTarget.value;
        if (this.prevValue !== searchString) {
            this.prevValue = searchString;
            if (searchString.length === 0) {
                Backbone.trigger('search:cleared');
            }
            if (searchString.length > 2) {
                Backbone.trigger('search:typed', searchString);
            }
        }

    }
});

module.exports = SearchBox;