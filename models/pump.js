// External Dependancies
const mongoose = require('mongoose')

const pumpSchema = new mongoose.Schema({
  name: String,
  address: String,
  loc:{
    type: { type: String },
    coordinates: [Number]
  },
  landMark: String,
  isDeleted: { type: Boolean, required: true, default: false },
  isActivated: { type: Boolean, required: true, default: true },
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true })

module.exports = mongoose.model('Pump', pumpSchema)