// public/js/controllers/EquipmentController.js

app.controller('EquipmentController', ['$scope', '$http', 'AuthService', function($scope, $http, AuthService) {
    $scope.isLoggedIn = AuthService.isLoggedIn();

    $scope.getEquipments = function() {
        $http.get('/api/equipment').then(function(response) {
            $scope.equipments = response.data;
        });
    };

    $scope.addEquipment = function() {
        var equipment = {
            name: $scope.name,
            description: $scope.description,
            image: $scope.image
        };

        $http.post('/api/equipment', equipment).then(function(response) {
            if(response.data.success) {
                $scope.getEquipments();
            } else {
                $scope.error = response.data.message;
            }
        });
    };

    $scope.updateEquipment = function(equipment) {
        $http.put('/api/equipment/' + equipment._id, equipment).then(function(response) {
            if(response.data.success) {
                $scope.getEquipments();
            } else {
                $scope.error = response.data.message;
            }
        });
    };

    $scope.deleteEquipment = function(equipment) {
        $http.delete('/api/equipment/' + equipment._id).then(function(response) {
            if(response.data.success) {
                $scope.getEquipments();
            } else {
                $scope.error = response.data.message;
            }
        });
    };

    $scope.rentEquipment = function(equipment) {
        $http.put('/api/equipment/rent/' + equipment._id).then(function(response) {
            if(response.data.success) {
                $scope.getEquipments();
            } else {
                $scope.error = response.data.message;
            }
        });
    };

    $scope.getEquipments();
}]);
