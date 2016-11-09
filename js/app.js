// Creating the module called parking
var parking = angular.module("parking", ['ngAnimate']);

// Registering the parkingCtrl to the parking module
parking.controller("parkingCtrl", function ($scope) {
  
  $scope.appTitle = "eiParking [Packt]";
  $scope.infoTopic = "Welcome!";
  $scope.infoDescription = "Please insert plate and color of the car";
  $scope.showAlert = false;
  $scope.alertTopic = "Something went wrong!";
  $scope.alertDescription = "You must inform the plate and the color of the car!";
  $scope.closeAlert = function () {
    $scope.showAlert = false;
  };

  // Binding the car’s array to the scope
  $scope.cars = [];
  /*
  $scope.cars = [
    {plate: '6MBV006', color: 'White'}, 
    {plate: '5BBM299', color: 'Red'}, 
    {plate: '5AOJ230', color: 'Black'}
  ];
  */

  $scope.colors = ["White", "Black", "Blue", "Red", "Silver"];
  
  // Binding the park function to the scope
  $scope.park = function (car) {
    car.entrance = new Date();
    $scope.cars.push(angular.copy(car));
    delete $scope.car;
  };

});

/*** DIRECTIVES ***/

parking.directive("alert", function () {
  return {
    restrict: 'E',
    scope: {
      topic: '=topic',
      description: '=description',
      close: '&close'
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
      description: '=description'
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