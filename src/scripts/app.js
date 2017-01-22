var app = angular.module("fabiosnApp", []);

app.controller('MainController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
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
      $scope.repos.slice(0, 3).map(function(repo) {
        $http.get(repo.contents_url.replace(/{.*}/, 'dist/images/thumbnail.png')).then(
          function(response) {
            repo.thumbnail = response.data;
          }
        );

        $http.get(repo.languages_url).then(
          function(response) {
            repo.languages = response.data;
          }
        );
      });
    },
    function(response) {
    }
  );

  $rootScope.keys = Object.keys;
}]);

