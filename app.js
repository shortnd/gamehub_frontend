"use strict";

angular
  .module("postTest", [
    "ngResource"
  ])
  .factory("PostFactory", [
    "$resource",
    PostFactoryFunction
  ])
  .controller("PostController", [
    "PostFactory",
    PostControllerFunction
  ])

function PostFactoryFunction($resource) {
  return $resource("http://localhost:3000/posts/:id", {}, {
    update: {method: "PUT"}
  })
}

function PostControllerFunction(PostFactory) {
  this.posts = PostFactory.query()
}
