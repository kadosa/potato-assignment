'use strict';
var Backbone = require('backbone');

var PhotoModel = Backbone.Model.extend({

    /**
     * Parse original date and set formatted attributes on model.
     * Done here because we're not really doing anything RESTful.
     * @param  {[type]} data Original photo data from the API call
     */
    initialize: function(data) {
        // grab the image id from the link url
        var linkArray = data.link.split('/');
        var id = linkArray[linkArray.length - 2];
        this.set('id', id);

        // parsing the date to a nicer format
        var formattedDate = Date.parse(data.published).toString('dS MMMM yyyy');
        formattedDate += ' at ' + Date.parse(data.published).toString('HH:mm');
        this.set('formattedPublished', formattedDate);

        // parse author name
        // grab the name from inside the parentheses
        // http://stackoverflow.com/questions/17779744/regular-expression-to-get-a-string-between-parentheses-in-javascript
        var regExp = /\(([^)]+)\)/;
        var authorName = regExp.exec(data.author);
        this.set('authorName', authorName[1]);
    }
});

module.exports = PhotoModel;