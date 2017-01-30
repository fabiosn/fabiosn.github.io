angular.module("fabiosnApp", ['ngRoute'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider
  .when('/', {
    templateUrl: 'app/partials/home.html',
  })
  .when('/cv', {
    templateUrl: 'app/partials/curriculum.html'
  });
}]);
