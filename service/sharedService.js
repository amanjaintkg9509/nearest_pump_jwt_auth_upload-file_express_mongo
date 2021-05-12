const jwt = require('jsonwebtoken');

// check auth token
function verifyToken(req,res,next){
  
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader === 'undefined') res.sendStatus(403).json({message:"authenticate token invaild"});
    const  bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    // req.token = bearerToken;
    jwt.verify(bearerToken, process.env.JWT_KEY, function(err, decoded) {
      if (err) {
        return res.json({
            success: false,
            message: "Failed to authenticate token.",
        });
      }
    req.user = decoded;
    return next();
    });
  }

module.exports = verifyToken;