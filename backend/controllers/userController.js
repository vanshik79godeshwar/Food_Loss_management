const User = require("../models/User");

const login = async (req, res, next) => {
  const {email}=req.body;
  if(!email) throw new Error("Email not found!");

  const user=await User.findOne({email});

  if(!user) return res.status(403).json({message:"User not found!"});

  return res.status(200).json(user);
};

const signUp = async (req, res, next) => {
  const { email, username, profilePic,type } = req.body;
  if (!email || !username || !type) {
    throw new Error("User Not found!");
  }
  const existUser=await User.findOne({email});

  if(existUser) return res.json(existUser);
  
  const user = new User({ email, username ,profilePic,type});
  await user.save();
  return res.status(200).json(user);
};

module.exports = { login, signUp };