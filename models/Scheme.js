const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Scheme Schema
const SchemeSchema = new Schema({
  state: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  benefits: {
    type: String,
    required: true
  },
  howToApply: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Scheme', SchemeSchema);
