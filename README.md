

Potato Assignment
============

A simple Backbone application to showcase a list of Flickr images.
It lists photos tagged with 'potato'. Features simple pagination and filtering.

## Setup

Run the development version with `gulp` or build the production ready code with `gulp production`

## About the code

I've used routes to manage application state as I was trying to simulate a scenario where there is a back-end providing a REST api. With the current setup it's possible that refreshing a url might break if the selected photo item is not returned in the concurrent API call.

For the amount of animation present in the app, including TweenMax might feel like an overkill, I just opted to use it to show that it's my go-to library when it comes to animations.

I've used the Backbone Paginator plugin for the 'Load more' style pagination. It would work well with a REST api as well.


## To-do

Create unit tests for views and e2e tests for filtering and navigating to a photo.

