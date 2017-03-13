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
  .controller("LoginController", [
    "$auth",
    LoginControllerFunction
  ])
  .controller("SignOutController", [
    "$auth",
    SignOutControllerFunction
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
  .state("signOut", {
    url: "/sign-out",
    templateUrl: "js/ng-views/sign-out.html",
    controller: "SignOutController",
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
    })
    .catch(resp => {
      console.log("Login failed!")
    })
  }
  this.logCurrentUser = function() {
    console.log($auth.validateUser().$$state.value)
  }
}

function SignOutControllerFunction($auth) {
  this.signOut = function() {
    $auth.signOut()
    .then(resp => {
      console.log(resp)
    })
    .catch(resp => {
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
