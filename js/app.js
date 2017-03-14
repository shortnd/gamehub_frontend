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
  .controller("AuthController", [
    "$auth",
    AuthControllerFunction
  ])
  .controller("PostIndexController", [
    "PostFactory",
    PostIndexControllerFunction
  ])

function RouterFunction($stateProvider) {
  $stateProvider
  .state("auth", {
    url: "/auth",
    templateUrl: "js/ng-views/auth.html",
    controller: "AuthController",
    controllerAs: "vm"
  })
  .state("postIndex", {
    url: "/posts",
    templateUrl: "js/ng-views/index.html",
    controller: "PostIndexController",
    controllerAs: "vm"
  })
}

function AuthControllerFunction($auth) {
  this.getCurrentUser = function() {
    let currentUser = $auth.validateUser().$$state.value
    if (currentUser !== undefined) {
      return currentUser
    }
  }
  this.signIn = function() {
    $auth.submitLogin(this.signInForm)
    .then(resp => {
      console.log("You signed in successfully!")
    })
    .catch(resp => {
      console.log("You did not sign in successfully. :(")
    })
  }
  this.signOut = function() {
    $auth.signOut()
    .then(resp => {
      console.log("You signed out successfully!")
    })
    .catch(resp => {
      console.log("You did not sign out successfully. :(")
    })
  }
}

function PostFactoryFunction($resource) {
  return $resource("http://localhost:3000/posts/:id", {}, {
    update: {method: "PUT"}
  })
}

function PostIndexControllerFunction(PostFactory) {
  this.posts = PostFactory.query()
}
