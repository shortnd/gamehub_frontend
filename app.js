"use strict";

angular
  .module("postTest", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("PostFactory", [
    "$resource",
    PostFactoryFunction
  ])
  .controller("PostIndexController",[
    "PostFactory",
    PostIndexControllerFunction
  ])
  .controller("PostNewController",[
    "PostFactory",
    PostNewControllerFunction
  ])
  .controller("PostShowController",[
    "PostFactory",
    "$state",
    PostShowControllerFunction
  ])
  .controller("PostEditController", [
    "PostFactory",
    "$stateParams",
    "$state",
    PostEditControllerFunction
  ])

function PostFactoryFunction($resource) {
  return $resource("http://localhost:3000/posts/:id", {}, {
    update: {method: "PUT"}
  })
}

function PostControllerFunction(PostFactory) {
  this.posts = PostFactory.query()
}

function
