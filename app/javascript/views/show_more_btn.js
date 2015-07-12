'use sctrict';
var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var template = require('../templates/show_more_btn');
Backbone.$ = $;

var ShowMoreBtnView = Backbone.View.extend({
    className: 'show-more-btn',
    events: {
        'click button': 'onClick'
    },

    initialize: function(options) {
        _.bindAll(this, 'onClick');
    },

    render: function() {
        this.$el.append(template());
        return this.$el;
    },

    onClick: function() {
        Backbone.trigger('show-more:clicked');
    }
});

module.exports = ShowMoreBtnView;