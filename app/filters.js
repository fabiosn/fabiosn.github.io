angular.module('fabiosnApp')
.filter('byNameDescOrLanguage', function() {
  return function(repos, searchParam) {
    searchParam = searchParam.toLowerCase();

    return repos.filter(function(repo) {
      //get the list of languages as a string
      var languages = Object.keys(repo.languages).join(', ');

      return (
        (repo.name.toLowerCase().indexOf(searchParam) > -1)
        || (repo.description.toLowerCase().indexOf(searchParam) > -1)
        || (languages.toLowerCase().indexOf(searchParam) > -1)
      );
    });
  };
});
