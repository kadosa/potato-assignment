'use sctrict';
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;
var PhotoThumbView = require('./photo_thumb');
var ShowMoreBtnView = require('./show_more_btn');
var SearchBoxView = require('./search_box');
var PhotoListView = Backbone.View.extend({

    className: 'photo-container',
    photoThumbList: [],

    initialize: function(options) {
        this.collection = options.collection
        this.initialCollection = _.clone(options.collection.fullCollection);

        this.$el.append('<div class="photo-list"></div>');
        this.$photoList = this.$el.find('.photo-list');
        this.setupListeners();
    },

    /**
     * Create photoThumbViews from the current photo collection.
     * Also add other views if not created yet/or if needed.
     * @return {[type]} [description]
     */
    render: function() {

        if (!this.searchBoxView) {
            this.searchBoxView = new SearchBoxView();
            this.$el.prepend(this.searchBoxView.render());
        }

        this.collection.each(_.bind(function(photoItem) {
            var photoThumbView = new PhotoThumbView({
                model: photoItem
            });
            this.$photoList.append(photoThumbView.render());
            this.photoThumbList.push(photoThumbView);
        }, this));

        if (this.collection.hasNextPage()) {
            this.addShowMoreBtn();
        } else {
            if (this.showMoreBtnView) {
                this.removeShowMoreBtn();
            }
        }



        return this.$el;
    },

    setupListeners: function() {
        this.listenTo(Backbone, 'search:typed', this.onSearchTyped);
        this.listenTo(Backbone, 'search:cleared', this.onSearchCleared);
        this.listenTo(Backbone, 'show-more:clicked', this.onShowMoreClicked);
        this.listenTo(this.collection.fullCollection, 'reset', this.onCollectionUpdate);
    },

    addShowMoreBtn: function() {
        this.showMoreBtnView = new ShowMoreBtnView();
        this.$el.append(this.showMoreBtnView.render());
    },

    removeShowMoreBtn: function() {
        this.showMoreBtnView.remove();
    },

    /**
     * Get next page in collection, remove the show more button
     * and rerender.
     * @return {[type]} [description]
     */
    onShowMoreClicked: function() {
        this.collection.getNextPage();
        this.removeShowMoreBtn();
        this.render();
    },

    /**
     * Filter the photo collection based on the search input value.
     * Search on the tag attribute.
     * @param  {[type]} searchString Search input field value
     */
    onSearchTyped: function(searchString) {
        var newArray = this.initialCollection.filter(function(photo) {
            return photo.get('tags').indexOf(searchString) !== -1
        });
        if (this.collection.fullCollection.models !== newArray) {
            this.collection.fullCollection.reset(newArray);
        }

    },

    /**
     * When the search field has been cleared,
     * reset the collection to the initial values.
     * @return {[type]} [description]
     */
    onSearchCleared: function() {
        if (this.collection.fullCollection.models !== this.initialCollection.models) {
            this.collection.fullCollection.reset(this.initialCollection.models);
        }

    },

    /**
     * Grab the first page of the collection and rerender the photo
     * list when the collection changes.
     * @return {[type]} [description]
     */
    onCollectionUpdate: function() {
        this.collection.getFirstPage();
        this.$photoList.empty();
        _.each(this.photoThumbList, function(thumbView) {
            thumbView.remove();
        });
        this.render();
    },

    hide: function() {
        TweenMax.to(this.el, 0.4, {
            autoAlpha: 0,
            display: 'none'
        });
    },

    show: function() {
        TweenMax.to(this.el, 0.4, {
            autoAlpha: 1,
            display: 'block'
        });

    }
});

module.exports = PhotoListView;