"use strict";

angular
  .module("postTest", [
    "ng-token-auth",
    "ngResource"
  ])
  .config([
    "$authProvider",
    AuthFunction
  ])
  .factory("PostFactory", [
    "$resource",
    PostFactoryFunction
  ])
  .controller("PostController", [
    "PostFactory",
    PostControllerFunction
  ])

function AuthFunction($authProvider) {
  $authProvider.configure({
    apiUrl: "http://localhost:3000"
  })
}

function PostFactoryFunction($resource) {
  return $resource("http://localhost:3000/posts/:id", {}, {
    update: {method: "PUT"}
  })
}

function PostControllerFunction(PostFactory) {
  this.posts = PostFactory.query()
}
