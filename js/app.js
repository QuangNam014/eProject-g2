let app = angular.module("myApp", ["ngRoute"])
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "home.html" })
        
})

// $(document).ready(function () {
//     console.log("khoi tao lai")
//     $('.owl-carousel').owlCarousel({
//         loop: true,
//         margin: 10,
//         nav: true,
//         responsive: {
//             0: {
//                 items: 1
//             },
//             600: {
//                 items: 3
//             },
//             1000: {
//                 items: 5
//             }
//         }
//     })
// });

app.directive("owlCarousel", owlCarouselDirective);
function owlCarouselDirective() {
  return {
    restrict  : "A",
    transclude: false,
    link      : function ($scope, element, attributes) {
      $scope.initCarousel = function () {
        $(element).owlCarousel($scope.HomeVM.owlDefaultOpts);
      };
    }
  };
}
function owlCarouselItemDirective() {
    return {
      restrict  : "A",
      transclude: false,
      link      : function ($scope, element, attributes) {
        if ( $scope.$last )
          $scope.initCarousel();
      }
    };
  }
