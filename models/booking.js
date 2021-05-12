// External Dependancies
const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  quantity: Number,
  type: { type: String, enum: ["gas", "diesel", "petrol"], default: "petrol" },
  filled_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  pump: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pump'
  },
  isDeleted: { type: Boolean, required: true, default: false },
  isActivated: { type: Boolean, required: true, default: true },
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)