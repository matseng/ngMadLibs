angular.module('ngMadLibs', []);

angular.module('ngMadLibs')
  .controller('MadLibsController', ['$scope', function($scope) {
    // $scope.maleName = {text: '', placeholder: 'male name'};
    $scope.maleName = {placeholder: 'male name'};
    $scope.tediousTask = {placeholder: 'tedious task'};
    $scope.dirtyTask = {placeholder: 'dirty task'};
    $scope.celebrity = {placeholder: 'celebrity'};
    $scope.uselessSkill = {placeholder: 'useless skill'};
    $scope.obnoxiousCelebrity = {placeholder: 'obnoxious celebrity'};
    $scope.hugeNumber = {placeholder: 'huge number'};
    $scope.adjective = {placeholder: 'adjective'};
  }]);

angular.module('ngMadLibs')
  .directive('injectWords', ['$compile', function($compile) {
    return {
      restrict: 'A',
      link: link
    };

    function link($scope, $element, attrs) {
      var wordElements = $element[0].getElementsByTagName('span');
      console.log(wordElements);
      for(var i = 0; i < wordElements.length; i++) {
        var $wordElement = angular.element(wordElements[i]);
        var wordString = $wordElement.attr('data-word');
        if(wordString) {
          var wordObject = $wordElement.scope()[wordString];
          var wordClassExpression = '{placeholder: !(' + wordString + '.text)}';
          var wordTextExpression = "{{" + wordString + ".text || '[' + " + wordString + ".placeholder + ']'}}";
          $wordElement.attr('ng-class', wordClassExpression);
          $wordElement.html(wordTextExpression);
          $compile($wordElement)($scope);
          console.log($wordElement);
        }
      }
    }
  }]);


  //<span ng-class='{placeholder: !(maleName.text)}'>{{maleName.text || '[' + maleName.placeholder + ']'}}</span>
