// public/js/controllers/MainController.js

app.controller('MainController', ['$scope', '$http', 'AuthService', function($scope, $http, AuthService) {
    $scope.isLoggedIn = AuthService.isLoggedIn();

    $scope.logout = function() {
        AuthService.logout();
        $scope.isLoggedIn = false;
    };

    $http.get('/api/about').then(function(response) {
        $scope.about = response.data;
    });

    $http.get('/api/contact').then(function(response) {
        $scope.contact = response.data;
    });

    $scope.translate = function(language) {
        var translateUrl = '/api/translate?lang=' + language;
        $http.get(translateUrl).then(function(response) {
            $scope.translatedText = response.data.translatedText;
        });
    };
}]);
