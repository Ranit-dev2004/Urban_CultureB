const config = require("../config/auth.config");
const db = require("../models/index.model");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "User already exists." });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).send({ message: "User signed up successfully" });

  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred during signup." });
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
