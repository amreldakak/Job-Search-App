

  const authorizeUser = (roles) => {
    return (req, res, next) => {
      //let user = req.role;
  
      if (roles.includes(req.role)) {
        next();
      }else{
        return res.json({ error:"Insufficient permissions"});
      }
      
    };
  };

  export default authorizeUser;