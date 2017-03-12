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


function RouterFunction($stateProvider){
  $stateProvider
    .state("postIndex",{
      url: "/posts",
      templateUrl: "js/ng-views/index.html",
      controller: "PostIndexController",
      controllerAs: "vm"
    })
    .state("postShow",{
      url: "/posts/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "PostShowController",
      controllerAs: "vm"
    })
}

function PostFactoryFunction($resource) {
  return $resource("http://localhost:3000/posts/:id", {}, {
    update: {
      method: "PUT"
    }
  })
}

function PostIndexControllerFunction(PostFactory){
  this.posts = PostFactory.query()
}

function PostNewControllerFunction(PostFactory, $state){
  this.post = new PostFactory()
  this.create = function(){
    this.post.$save(function(post){
      $state.go("postShow",{
        id: post.id
      })
    })
  }
}

function PostShowControllerFunction(PostFactory, $stateParams){
  this.post = PostFactory.get({
    id: $stateParams.id
  })
}

function PostEditControllerFunction(PostFactory, $stateParams, $state){
  this.post = PostFactory.get({
    id: $stateParams.id
  })
  this.update = function(){
    this.post.$update({
      id: $stateParams.id
    }, function(post){
        $state.go("postShow", {
          id: entrie.id
        })
    })
  }
  this.destroy = function() {
    this.post.$delete({
      id: $stateParams.id
    }), function(post){
      $state.go("postIndex")
    }
  }
}
