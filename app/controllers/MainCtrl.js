angular.module("fabiosnApp", []).controller('MainCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
  $http.get('dist/data/user.json').then(
    function(response) {
      $scope.user = response.data;
    },
    function(response) {
    }
  );

  $http.get('dist/data/repos.json').then(
    function(response) {
      $scope.repos = response.data;
    },
    function(response) {
    }
  );

  $rootScope.keys = Object.keys;
}]);
