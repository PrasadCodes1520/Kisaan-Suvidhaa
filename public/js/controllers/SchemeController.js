// public/js/controllers/SchemeController.js

app.controller('SchemeController', ['$scope', '$http', 'SchemeService', function($scope, $http, SchemeService) {
    $scope.schemes = [];
    $scope.selectedState = '';

    // Fetch all schemes
    SchemeService.getSchemes().then(function(response) {
        $scope.schemes = response.data;
    }, function(error) {
        console.log('Unable to retrieve schemes:', error);
    });

    // Fetch schemes by state
    $scope.getSchemesByState = function() {
        SchemeService.getSchemesByState($scope.selectedState).then(function(response) {
            $scope.schemes = response.data;
        }, function(error) {
            console.log('Unable to retrieve schemes:', error);
        });
    };

    // Search for a scheme
    $scope.searchScheme = function() {
        SchemeService.searchScheme($scope.searchText).then(function(response) {
            $scope.schemes = response.data;
        }, function(error) {
            console.log('Unable to retrieve schemes:', error);
        });
    };
}]);
