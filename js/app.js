"use strict";

angular
  .module("postTest", [
    "ng-token-auth",
    "ui.router",
    "ngResource"
  ])
  .config($authProvider => {
    $authProvider.configure({
      apiUrl: "http://localhost:3000"
    })
  })
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("PostFactory", [
    "$resource",
    PostFactoryFunction
  ])
  .controller("PostIndexController", [
    "PostFactory",
    PostIndexControllerFunction
  ])

function RouterFunction($stateProvider) {
  $stateProvider
  .state("postIndex", {
    url: "/posts",
    templateUrl: "js/ng-views/index.html",
    controller: "PostIndexController",
    controllerAs: "vm"
  })
}

function PostFactoryFunction($resource) {
  return $resource("http://localhost:3000/posts/:id", {}, {
    update: {method: "PUT"}
  })
}

function PostIndexControllerFunction(PostFactory) {
  this.posts = PostFactory.query()
}
