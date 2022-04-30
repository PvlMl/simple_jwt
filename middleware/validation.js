module.exports = function(req, res, next){
  if(!req.body.username.trim()){
    res.status(400).json({ message: "Username cannot be empty" });
        return;
  }
  if(!req.body.password.trim()){
    res.status(400).json({ message: "Password cannot be empty" });
        return;
  }
  if(req.body.password.trim().length < 4){
    res.status(400).json({ message: "Too short password" });
        return;
  }
  next();
};