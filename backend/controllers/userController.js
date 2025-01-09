const User = require("../models/User");

const login = async (req, res, next) => {
  const {email}=req.body;
  if(!email) throw new Error("Email not found!");

  const user=await User.findOne({email});

  if(!user) return res.status(403).json({message:"User not found!"});

  return res.status(200).json(user);
};

const signUp = async (req, res, next) => {
  const { email, username, profile,type } = req.body;

  if (!email || !username) {
    throw new Error("User Not found!");
  }
  let profilePic =
    profile === ""
      ? "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      : profile;
  const user = new User({ email, username ,profilePic,type});
  await user.save();
  return res.status(200).json({message:'User logged successfully!'})
};

module.exports = { login, signUp };