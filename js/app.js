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
  .controller('LoginController', [
    "$auth",
    LoginControllerFunction
  ])
  .controller("PostIndexController", [
    "PostFactory",
    PostIndexControllerFunction
  ])

function RouterFunction($stateProvider) {
  $stateProvider
  .state("login", {
    url: "/login",
    templateUrl: "js/ng-views/login.html",
    controller: "LoginController",
    controllerAs: "vm"
  })
  .state("postIndex", {
    url: "/posts",
    templateUrl: "js/ng-views/index.html",
    controller: "PostIndexController",
    controllerAs: "vm"
  })
}

function LoginControllerFunction($auth) {
  this.login = function() {
    $auth.submitLogin(this.loginForm)
    .then(resp => {
      console.log("Login successful!")
      console.log(resp)
    })
    .catch(resp => {
      console.log("Login failed!")
      console.log(resp)
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
