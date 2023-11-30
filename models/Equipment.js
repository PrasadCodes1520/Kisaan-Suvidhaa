const mongoose = require('mongoose');


// Equipment Schema
const EquipmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rented: {
    type: Boolean,
    default: false
  },
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Equipment = module.exports = mongoose.model('Equipment', EquipmentSchema);

module.exports.getEquipmentById = function(id, callback){
  Equipment.findById(id, callback);
}

module.exports.addEquipment = function(newEquipment, callback){
  newEquipment.save(callback);
}

module.exports.updateEquipment = function(id, update, callback){
  Equipment.findByIdAndUpdate(id, update, callback);
}

module.exports.deleteEquipment = function(id, callback){
  Equipment.findByIdAndRemove(id, callback);
}
