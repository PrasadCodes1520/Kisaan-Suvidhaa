// public/js/services/EquipmentService.js

app.factory('EquipmentService', ['$http', function($http) {
    var equipmentService = {};

    equipmentService.getEquipments = function() {
        return $http.get('/api/equipment');
    };

    equipmentService.addEquipment = function(equipment) {
        return $http.post('/api/equipment', equipment);
    };

    equipmentService.updateEquipment = function(id, equipment) {
        return $http.put('/api/equipment/' + id, equipment);
    };

    equipmentService.deleteEquipment = function(id) {
        return $http.delete('/api/equipment/' + id);
    };

    equipmentService.rentEquipment = function(id) {
        return $http.put('/api/equipment/rent/' + id);
    };

    return equipmentService;
}]);
