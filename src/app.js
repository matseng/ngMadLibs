angular.module('ngMadLibs', []);

angular.module('ngMadLibs')
  .controller('MadLibsController', ['$scope', function($scope) {
    // $scope.maleName = {text: '', placeholder: 'male name'};
    $scope.maleName = {placeholder: 'male name'};
  }]);
