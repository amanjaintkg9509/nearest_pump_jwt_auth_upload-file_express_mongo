'use strict'
// Require external modules
const User = require('../models/user');

exports.getAll = async function(req, res) {
    try{
        let obj ={isDeleted:false,isActivated:true}
        const users = await User.find(obj)
        res.status(200).send(users)
    } catch (err) {
        throw err;
    }
};

exports.get = async function(req, res) {
    try {
        const id = req.params.id
        let obj ={isDeleted:false,isActivated:true,id:id}
        const user = await User.findById(obj)
        res.status(200).send(user)
    } catch (err) {
        throw err
    }
};

exports.post = async function(req, res) {
    try {
        const user = new User(req.body)
        let _data = user.save()
        res.status(200).json({success:true,message:'User has been created!'})
    } catch (err) {
        throw err
    }
};

exports.put = async function(req, res) {
    try {
        const id = req.params.id
        const bodyData = req.body
        const { ...updateData } = bodyData
        const update = await User.findByIdAndUpdate(id, updateData, { new: true })
        res.status(200).json({success:true,message:'User has been updated!'})
    } catch (err) {
        throw err
    }
};

exports.delete = async function(req, res) {
    try {
        const id = req.params.id
        const user = await User.findByIdAndRemove(id)
        reply.status(200).json({success:true,message:'User has been deleted!'})
    } catch (err) {
        throw err
    }
};