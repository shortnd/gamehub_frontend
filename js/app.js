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
  .factory("UserFactory", [
    "$resource",
    UserFactoryFunction
  ])
  .factory("PostFactory", [
    "$resource",
    PostFactoryFunction
  ])
  .controller("AuthController", [
    "$auth",
    AuthControllerFunction
  ])
  .controller("UserIndexController", [
    "UserFactory",
    UserIndexControllerFunction
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
  .state("userIndex", {
    url: "/users",
    templateUrl: "js/ng-views/users.html",
    controller: "UserIndexController",
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
  this.signUp = function() {
    $auth.submitRegistration(this.signUpForm)
    .then(resp => {
      console.log("You signed in successfully!")
    })
    .catch(resp => {
      console.log("You did not sign in successfully. :(")
    })
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

function UserFactoryFunction($resource) {
  return $resource("http://localhost:3000/users/:id", {}, {
  })
}

function PostFactoryFunction($resource) {
  return $resource("http://localhost:3000/posts/:id", {}, {
    update: {method: "PUT"}
  })
}

function UserIndexControllerFunction(UserFactory) {
  this.users = UserFactory.query()
}

function PostIndexControllerFunction(PostFactory) {
  this.posts = PostFactory.query()
}
