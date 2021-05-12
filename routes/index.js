var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var multer  = require('multer')
require('dotenv').config()
let destination = './public/images/uploads/';
var verifyToken = require('../service/sharedService');

var upload = multer({ dest: destination,limits: { fileSize: 3 * 1024 * 1024 } })

router.post('/upload', verifyToken ,upload.single('file'), function (req, res, next) {
  if (req.file.size > 3 * 1024 * 1024){
      fs.unlink(req.file.path)
    return res.send({
      result: 'fail',
      error:{
        code: 1001,
        message: 'File is too big'}})
  }
  res.send({success:true,message:'file has been uploaded',file_link: req.get('host')+'/'+req.file.path })
})

router.post('/login', function(req, res, next) {
  const user = {
    id:1,
    username: 'Aman',
    email:'aman@yopmail.com'
  }
  jwt.sign({user}, process.env.JWT_KEY,{expiresIn:'60s'},(err, token)=>{
    res.json({
        token
    })
  })
});

module.exports = router;
