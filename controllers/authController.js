const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
//Password Validate Function
const validatePassword = (password) => {
  const pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return pass.test(password);
};
exports.register = async (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword, role } =
    req.body;

  //Check if password match
  if (password !== confirmPassword) {
    return res.json("no match");
  }

  //Validate Password
  if (!validatePassword(password)) {
    return res.json("invalid password");
  }
  try {
    //check if user already exist
    let user = await User.findOne({ email });
    if (user) {
      return res.json("exists");
    } else {
      user = new User({ firstName, lastName, email, phone, password, role });
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(user.password, salt);
      await user.save();

      const token = user.generateAuthToken();
      res.header("auth-token", token).json(user);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.json("Invalid");
    }
    if (!user) {
      return res.json("Invalid");
    }

    const token = user.generateAuthToken();
    res.json({ token });
  } catch (error) {
    res.json({ message: error.message });
  }
};
exports.getUser = async (req, res)=> {
  try {
    const user = await User.findById(req.user.id)
    res.json(user)
    
  } catch (error) {
    res.json({message: error.message})
    
  }
}