// Creating the module called parking
var parking = angular.module("parking", ['ngAnimate']);

// Registering the parkingCtrl to the parking module
//parking.controller("parkingCtrl", function ($scope, $filter) {
// instead of using the simple form above, to avoid errors in minification it's better to use the inline array annotation
parking.controller("parkingCtrl", ["$scope", "$filter", "$window", function ($scope, $filter, $window) {
  
  $scope.appTitle = "eiParking [Packt]";
  $scope.infoTopic = $filter("uppercase")("Welcome!");
  $scope.infoDescription = "Please insert plate and color of the car";
  $scope.showInfo = true;
  $scope.alertTopic = "Be careful!";
  $scope.alertDescription = "The plate should follow this pattern: XX123XX (2 letters, 3 numbers, 2 letters)";
  $scope.closeInfo = function () {
    $scope.showInfo = false;
  };

  // Binding the car’s array to the scope
  //$scope.cars = [];
  /*
  $scope.cars = [
    {plate: 'BV006VB', color: 'White', entrance: new Date(2016, 10, 20, 11, 10, 30, 0)}, 
    {plate: 'BB299ZA', color: 'Red', entrance: new Date(2016, 10, 20, 10, 33, 24, 0)}, 
    {plate: 'AJ230SA', color: 'Black', entrance: new Date(2016, 10, 20, 11, 33, 41, 0)}
  ];
  */
  // Loading the car’s array from localStorage
  $scope.saved = $window.localStorage.getItem('eiparkedcars');
  $scope.cars = ($window.localStorage.getItem('eiparkedcars')!==null) ? JSON.parse($scope.saved) :
  [
    {plate: 'BV006VB', color: 'White', entrance: new Date(2016, 10, 20, 11, 10, 30, 0)}, 
    {plate: 'BB299ZA', color: 'Red', entrance: new Date(2016, 10, 20, 10, 33, 24, 0)}, 
    {plate: 'AJ230SA', color: 'Black', entrance: new Date(2016, 10, 20, 11, 33, 41, 0)}
  ];
  $window.localStorage.setItem('eiparkedcars', JSON.stringify($scope.cars));

  
  $scope.colors = ["White", "Black", "Blue", "Red", "Silver"];
  
  // Binding the park function to the scope
  $scope.park = function (car) {
    car.entrance = new Date();
    $scope.cars.push(angular.copy(car));
    delete $scope.car;
    $scope.carForm.$setPristine();
    $window.localStorage.setItem('eiparkedcars', JSON.stringify($scope.cars));
  };

}]);
//});


/*** DIRECTIVES ***/

parking.directive("alert", function () {
  return {
    restrict: 'E',
    scope: {
      topic: '=topic',
      description: '=description'
    },
    templateUrl: 'tpl/alertdiv.html',
    replace: true
  };
});
parking.directive("info", function () {
  return {
    restrict: 'E',
    scope: {
      topic: '=topic',
      description: '=description',
      close: '&close'
    },
    templateUrl: 'tpl/infodiv.html',
    replace: true
  };
});



/*** FILTERS ***/

parking.filter("plate", function() {
  return function(input, separator = '-') {
    var firstPart = input.substring(0,2);
    var secondPart = input.substring(2,5);
    var thirdPart = input.substring(5);
    return firstPart + separator + secondPart + separator + thirdPart;
  };
});