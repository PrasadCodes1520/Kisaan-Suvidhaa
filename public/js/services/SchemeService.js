// public/js/services/SchemeService.js

app.factory('SchemeService', ['$http', function($http) {
    let service = {};

    service.getSchemesByState = function(state) {
        return $http.get('/api/schemes/' + state).then(function(response) {
            return response.data;
        });
    };

    return service;
}]);
