'use sctrict';
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var template = require('../templates/photo_detail');
Backbone.$ = $;

var PhotoDetailView = Backbone.View.extend({
    tagName: 'article',
    className: 'photo-container detail-container',

    initialize: function(options) {
        var test = $(this.model.get('description'));
        _.bindAll(this, 'enter');
    },

    render: function() {
        this.$el.append(template(this.model.toJSON()));
        TweenMax.set(this.el, {
            autoAlpha: 0
        });
        gapi.plusone.render(this.$el.find('.g-plusone')[0], {
            'href': this.model.get('link')
        });
        return this.$el;
    },

    enter: function() {
        TweenMax.to(this.el, 0.4, {
            autoAlpha: 1
        });
    },

    out: function(callback) {
        var self = this;
        TweenMax.to(this.el, 0.4, {
            autoAlpha: 0,
            onComplete: function() {
                callback();
                self.remove();
            }
        });
    }
});

module.exports = PhotoDetailView;