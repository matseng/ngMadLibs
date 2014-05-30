angular.module('ngMadLibs', []);

angular.module('ngMadLibs')
  .controller('MadLibsController', ['$scope', function($scope) {
    // $scope.maleName = {text: '', placeholder: 'male name'};
    $scope.data = {};
    $scope.data.personName = {placeholder: 'person name'};
    $scope.data.tediousTask = {placeholder: 'tedious task'};
    $scope.dirtyTask = {placeholder: 'dirty task'};
    $scope.celebrity = {placeholder: 'celebrity'};
    $scope.uselessSkill = {placeholder: 'useless skill'};
    $scope.obnoxiousCelebrity = {placeholder: 'obnoxious celebrity'};
    $scope.hugeNumber = {placeholder: 'huge number'};
    $scope.adjective = {placeholder: 'adjective'};

    $scope.gender = 'Other';
    var genderLookup = {
      Other: {
        pronoun: 'he/she',
        possessive: 'his/her'
      },
      F: {
        pronoun: 'she',
        possessive: 'her'
      },
      M: {
        pronoun: 'he',
        possessive: 'his'
      }
    };
    $scope.$watch('data.gender', function() {
      $scope.pronoun = genderLookup[$scope.gender].pronoun;
      $scope.possessive = genderLookup[$scope.gender].possessive;
    });
  }]);

angular.module('ngMadLibs')
  .controller('FormController', ['$scope', function($scope) {
    $scope.submit = function(a,b,c) {
      $scope.MyForm.submitted = true;
      console.log($scope.data);
    };
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
        }
      }
    }
  }]);


  //<span ng-class='{placeholder: !(maleName.text)}'>{{maleName.text || '[' + maleName.placeholder + ']'}}</span>
