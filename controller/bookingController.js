'use strict'
// Require external modules
const Booking = require('../models/booking');
var ObjectId = require('mongodb').ObjectID;

exports.getAll = async function(req, res) {
    try{
        let obj ={isDeleted:false,isActivated:true}
        const bookings = await Booking.find(obj).populate('filled_by',{fullName:1,age:1,gender:1}).populate('user',{fullName:1,age:1,gender:1}).populate('pump')
        res.status(200).send(bookings)
    } catch (err) {
        throw err;
    }
};

exports.get = async function(req, res) {
    try {
        const id = req.params.id
        let obj ={isDeleted:false,isActivated:true,_id: ObjectId(id)}
        await Booking.aggregate([
            { "$match": obj },
            {
                $lookup: {
                    from: "users",
                    let: { id: "$user" },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$_id", "$$id"] },
                                    { $eq: ["$isActivated", true] },
                                    { $eq: ["$isDeleted", false] }
                                ]
                            }
                        }
                    },
                    {
                        $project: { _id: 1,fullName:1 }
                    }],
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "users",
                    let: { id: "$filled_by" },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$_id", "$$id"] },
                                    { $eq: ["$isActivated", true] },
                                    { $eq: ["$isDeleted", false] }
                                ]
                            }
                        }
                    },
                    {
                        $project: { _id: 1,fullName:1 }
                    }],
                    as: "filled_by"
                }
            },
            {
                $project: {
                    quantity: "$quantity",
                    type: "$type",
                    filled_by: "$filled_by",
                    user: "$user",
                    isDeleted: "$isDeleted",
                    createdAt:"$createdAt",
                    updatedAt:"$updatedAt"
                }
            },
        ]).exec((err, bookingDetail) => {
            if (err) throw err;
            res.status(200).send(bookingDetail)
        })
        
    } catch (err) {
        throw err
    }
};

exports.post = async function(req, res) {
    try {
        console.log(req.body)
        const booking = new Booking(req.body)
        let _data = booking.save()
        res.status(200).json({success:true,message:'Booking has been created!'})
    } catch (err) {
        throw err
    }
};

exports.put = async function(req, res) {
    try {
        const id = req.params.id
        const bodyData = req.body
        const { ...updateData } = bodyData
        const update = await Booking.findByIdAndUpdate(id, updateData, { new: true })
        res.status(200).json({success:true,message:'Booking has been updated!'})
    } catch (err) {
        throw err
    }
};

exports.delete = async function(req, res) {
    try {
        const id = req.params.id
        const booking = await Booking.findByIdAndRemove(id)
        reply.status(200).json({success:true,message:'Booking has been deleted!'})
    } catch (err) {
        throw err
    }
};