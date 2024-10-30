const config = require("../config/auth.config");
const db = require("../models/index.model");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { email, password, FirstName, LastName } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists." });
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({
      FirstName,
      LastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong during registration." });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!"
      });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400
    });

    res.status(200).send({
      id: user._id,
      email: user.email,
      accessToken: token
    });

  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred during signin." });
  }
};

exports.getusers =async(req,res)=>{
  const userId = req.userId; 
  try{
    const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.FirstName,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
};
};