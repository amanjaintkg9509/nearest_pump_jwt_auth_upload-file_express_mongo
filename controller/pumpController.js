'use strict'
// Require external modules
const Pump = require('../models/pump');
var geoip = require('geoip-lite');

exports.getAll = async function(req, res) {
    try{
        var ip = req.ip;
        let ipArray = ip.split(":");
        var ipAddres = "207.97.227.239";//ipArray[3];
        var geo = geoip.lookup(ipAddres);
        
        let obj ={isDeleted:false,isActivated:true,loc :
            { $near :
               {
                 $geometry : {
                    type : "Point" ,
                    coordinates : [geo && geo.ll ?geo.ll[1]:-73.97, geo && geo.ll ?geo.ll[0]: 40.77] },
                 $maxDistance : 100000
               }
            }
         };
        const pump = await Pump.find(obj);
            res.status(200).send(pump)
        
    } catch (err) {
        throw err;
    }
};

exports.get = async function(req, res) {
    try {
        const id = req.params.id
        let obj ={isDeleted:false,isActivated:true,id:id}
        const pump = await Pump.findById(obj)
        res.status(200).send(pump)
    } catch (err) {
        throw err
    }
};

exports.post = async function(req, res) {
    try {
        const pump = new Pump(req.body)
        let _data = pump.save()
        res.status(200).json({success:true,message:'Pump has been created!'})
    } catch (err) {
        throw err
    }
};

exports.put = async function(req, res) {
    try {
        const id = req.params.id
        const bodyData = req.body
        const { ...updateData } = bodyData
        const update = await Pump.findByIdAndUpdate(id, updateData, { new: true })
        res.status(200).json({success:true,message:'Booking has been updated!'})
    } catch (err) {
        throw err
    }
};

exports.delete = async function(req, res) {
    try {
        const id = req.params.id
        const pump = await Pump.findByIdAndRemove(id)
        reply.status(200).json({success:true,message:'Booking has been deleted!'})
    } catch (err) {
        throw err
    }
};