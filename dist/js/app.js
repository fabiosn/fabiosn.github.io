var app = angular.module("fabiosnApp", []);

app.controller('MainController', ['$scope', '$http', function($scope, $http) {
  $http.get('https://api.github.com/users/fabiosn').then(
    function(response) {
      $scope.user = response.data;
    },
    function(response) {
    }
  );

  $http.get('https://api.github.com/users/fabiosn/repos').then(
    function(response) {
      $scope.repos = response.data;
    },
    function(response) {
    }
  );
}]);

