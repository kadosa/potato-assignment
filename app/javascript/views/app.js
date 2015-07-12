'use sctrict';
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;
var PhotoListView = require('./photo_list');
var PhotoDetailView = require('./photo_detail');

var AppView = Backbone.View.extend({

    photoListView: null,
    el: $('#app'),

    initialize: function(options) {

        this.setupListeners();
        _.bindAll(this, 'showPhotoViewList');
    },

    render: function() {
        this.$el.empty();
        this.$el.append(this.photoListView.render());
    },

    hidePhotoListView: function() {
        this.photoListView.hide();
    },

    showPhotoViewList: function() {
        this.photoListView.show();
    },

    setupListeners: function() {
        this.listenTo(Backbone, 'page:home', this.onHomePage);
        this.listenTo(Backbone, 'page:photo', this.onPhotoPage);
    },

    onHomePage: function() {
        if (this.currentPhotoView) {
            this.currentPhotoView.out(this.showPhotoViewList);
        }
    },

    onPhotoPage: function(id) {

        this.hidePhotoListView();
        this.createPhotoDetailView(this.photoListView.collection.fullCollection.get(id));
    },

    onPhotosLoaded: function(photoCollection) {
        this.photoListView = new PhotoListView({
            collection: photoCollection
        });
        this.render();
    },

    createPhotoDetailView: function(photoModel) {
        this.currentPhotoView = new PhotoDetailView({
            model: photoModel
        });
        this.$el.append(this.currentPhotoView.render());
        this.currentPhotoView.enter();
    }

});

module.exports = AppView;