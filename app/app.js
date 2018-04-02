var prac1 = angular.module('myPrac1',['ngRoute', 'ngAnimate']);

prac1.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/home', {
    templateUrl: 'view/home.html',
    controller: 'myPrac1Controller'
  })
  .when('/list', {
    templateUrl: 'view/list.html',
    controller: 'myPrac1Controller'
  })
  .when('/contact', {
    templateUrl: 'view/contact.html',
    controller: 'myPrac1ContactController'
  })
  .when('/contact-success', {
    templateUrl: 'view/contact-success.html',
    controller: 'myPrac1ContactController'
  }).otherwise({
    redirectTo: '/home'
  });

}]);

prac1.controller('myPrac1Controller', ['$scope', '$http', function($scope, $http){

$http.get('../../data/sports.json').then(function(result){
  $scope.sports = result.data;
});

$scope.removeSport = function(sport){
  $scope.sports.splice($scope.sports.indexOf(sport), 1);
};

$scope.addSport = function(){
  $scope.sports.push({
    name: $scope.newsport.name,
    level: parseInt($scope.newsport.level),
    cost: parseInt($scope.newsport.cost),
    marking: $scope.newsport.marking,
    active: true
  });

  $scope.newsport.name='';
  $scope.newsport.level='';
  $scope.newsport.cost='';
  $scope.newsport.marking='';
};

$scope.removeAll = function(){
  $scope.sports = [];
};

}]);

prac1.directive('randomSport', [function(){
  return {
    restrict: 'E',
    scope: {
      sports: '=',
      title: '='
    },
    //template: '<img ng-src="{{sports[1].thumb}}" />',
    templateUrl: '../../view/random.html',
    transclude: true,
    controller: function($scope){
      $scope.random = Math.floor(Math.random()*5);
    }
  };
}]);

prac1.controller('myPrac1ContactController',['$scope', '$location', function($scope, $location){
  $scope.sendMessage = function(){
    $location.path('/contact-success');
  }
}]);
