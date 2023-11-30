// public/js/services/AuthService.js

app.factory('AuthService', ['$http', '$window', function($http, $window) {
    var authService = {};

    authService.saveToken = function(token) {
        $window.localStorage['kisan-suvidha-token'] = token;
    };

    authService.getToken = function() {
        return $window.localStorage['kisan-suvidha-token'];
    };

    authService.isLoggedIn = function() {
        var token = authService.getToken();
        if(token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    authService.currentUser = function() {
        if(authService.isLoggedIn()) {
            var token = authService.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
                _id: payload._id,
                name: payload.name,
                username: payload.username,
                userType: payload.userType
            };
        }
    };

    authService.register = function(user) {
        return $http.post('/api/register', user).then(function(data) {
            authService.saveToken(data.data.token);
        });
    };

    authService.logIn = function(user) {
        return $http.post('/api/authenticate', user).then(function(data) {
            authService.saveToken(data.data.token);
        });
    };

    authService.logOut = function() {
        $window.localStorage.removeItem('kisan-suvidha-token');
    };

    return authService;
}]);
