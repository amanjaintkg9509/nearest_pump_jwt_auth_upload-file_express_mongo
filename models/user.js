// External Dependancies
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: { type: String},
  age: { type: Number},
  gender: { type: String, enum: ["female", "male"], default: "male" },
  role: { type: String, enum: ["user", "worker"], default: "user" },
  isDeleted: { type: Boolean, required: true, default: false },
  isActivated: { type: Boolean, required: true, default: true },
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)