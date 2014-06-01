angular.module('ngMadLibs', []);

angular.module('ngMadLibs')
  .controller('FormController', ['$scope', '$rootScope', function($scope, $rootScope) {
    
    function initializeData() {
      $scope.data = {};
      $scope.data.gender = 'Other';
      $scope.data.personName = {placeholder: 'person name'};
      $scope.data.jobTitle = {placeholder: 'job title'};
      $scope.data.tediousTask = {placeholder: 'tedious task'};
      $scope.data.dirtyTask = {placeholder: 'dirty task'};
      $scope.data.celebrity = {placeholder: 'celebrity'};
      $scope.data.uselessSkill = {placeholder: 'useless skill'};
      $scope.data.obnoxiousCelebrity = {placeholder: 'obnoxious celebrity'};
      $scope.data.hugeNumber = {placeholder: 'huge number'};
      $scope.data.adjective = {placeholder: 'adjective'};
    };
    initializeData();

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
      $scope.data.pronoun = genderLookup[$scope.data.gender].pronoun;
      $scope.data.possessive = genderLookup[$scope.data.gender].possessive;
    });

    $scope.submit = function(a,b,c) {
      $scope.MyForm.submitted = true;
      if ($scope.MyForm.$valid) {
        $scope.MyForm.submittedValid = true;
        console.log($scope.MyForm.submittedValid);
        $rootScope.$broadcast('formSubmitted', $scope.data);
      }
    };

    $scope.$on('resetClicked', function() {
      console.log("hello world, reset 2");
      initializeData();
      $scope.MyForm.submitted = false;
      $scope.MyForm.submittedValid = false;
      $scope.data.gender = 'F';  //TODO: remove, just for testing
    });
  }]);

angular.module('ngMadLibs')
  .controller('ParagraphController', ['$scope', '$rootScope', function($scope, $rootScope) {

    $scope.$on('formSubmitted', function(event, formData) {
      $scope.submittedValid = true;
      $scope.data = formData;
      console.log($scope.data);
    });

    $scope.reset = function() {
      $scope.submittedValid = false;
      $rootScope.$broadcast('resetClicked');
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
          var wordClassExpression = '{placeholder: !( data[' + wordString + '].text)}';
          var wordTextExpression = "{{ data[" + wordString + "].text || '[' + data[" + wordString + "].placeholder + ']'}}";
          $wordElement.attr('ng-class', wordClassExpression);
          $wordElement.html(wordTextExpression);
          $compile($wordElement)($scope);
        }
      }
    }
  }]);


  //<span ng-class='{placeholder: !(maleName.text)}'>{{maleName.text || '[' + maleName.placeholder + ']'}}</span>
