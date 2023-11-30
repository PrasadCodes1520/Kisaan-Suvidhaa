// public/js/controllers/UserController.js

app.controller('UserController', ['$scope', '$http', '$location', 'AuthService', function($scope, $http, $location, AuthService) {
    $scope.isLoggedIn = AuthService.isLoggedIn();

    $scope.register = function() {
        var user = {
            name: $scope.name,
            email: $scope.email,
            username: $scope.username,
            password: $scope.password,
            userType: $scope.userType
        };

        AuthService.register(user).then(function(response) {
            if(response.data.success) {
                $location.path('/login');
            } else {
                $scope.error = response.data.message;
            }
        });
    };

    $scope.login = function() {
        var user = {
            username: $scope.username,
            password: $scope.password
        };

        AuthService.login(user).then(function(response) {
            if(response.data.success) {
                $scope.isLoggedIn = true;
                $location.path('/home');
            } else {
                $scope.error = response.data.message;
            }
        });
    };

    $scope.logout = function() {
        AuthService.logout();
        $scope.isLoggedIn = false;
        $location.path('/login');
    };
}]);
