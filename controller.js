const User = require("./models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require("./config");


const generateAccesToken = (id,username, password) => {
return jwt.sign({ id, username, password }, secret, {expiresIn: '24h'})
};


module.exports = {
  registration: async (req, res) => {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        res.status(400).json({ message: "This username already exist" });
        return;
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const user = new User({username, password: hashPassword});
      await user.save();
      res.json("User added");
      return;
    } catch (e) {
      console.log(e);
      res.status(400).json("error occurred");
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if(!username) return res.status(400).json("empty username");
      const user = await User.findOne({username});
      if(!user) return res.status(400).json("user not found");
      const id = user._id;
      if(!bcrypt.compareSync(password, user.password)) return res.status(400).json("Incorrect password");
      else {
        const token = generateAccesToken(id, username, user.password);
        res.status(200).json({token});
        return;
      };
    } catch (e) {
      console.log(e);
      res.status(400).json("error occurred");
    }
  },
  getUsers: async (req, res) => {
    try {
      console.log(req.user)
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
      res.status(400).json("error occurred");
    }
  },
};
