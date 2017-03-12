angular
  .module("gamehub",[
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("GameFactory",[
    "$resource",
    GameFactoryFunction
  ])
  .controller("GameIndexController", [
    "GameFactory",
    GameIndexControllerFunction
  ])
  .controller("GameShowController", [
    "GameFactory",
    GameShowControllerFunction
  ])

  function RouterFunction($stateProvider) {
    $stateProvider
      .state("gameIndex", {
        url: "/posts",
        templateUrl:"js/ng-views/index.html",
        controller: "GameIndexController",
        controllerAs: "vm"
      })
  }

  function GameFactoryFunction($resource) {
    return $resource("http://localhost:3000/posts")
  }

  function GameIndexControllerFunction(GameFactory) {
    this.posts = GameFactory.query()
  }
