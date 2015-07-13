'use sctrict';
var Backbone = require('backbone');
var $ = require('jquery');
var template = require('../templates/photo_thumb');
Backbone.$ = $;

var PhotoThumbView = Backbone.View.extend({
    className: 'photo-thumb',
    tagName: 'article',

    initialize: function(options) {

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
});

module.exports = PhotoThumbView;