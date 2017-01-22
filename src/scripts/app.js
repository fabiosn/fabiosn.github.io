var app = angular.module("fabiosnApp", []);

app.controller('MainController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
  var username = "fabiosn";
  var token = "a00a9e9bda18c2eb26568981adc085ec3afd2b21";
  var credentials = btoa(username + ':' + token);

  $http.defaults.headers.common.Authorization = 'Basic ' + credentials;

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
      $scope.repos.map(function(repo) {
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

