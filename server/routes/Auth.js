const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const CryptoJS = require("crypto-js");

// Registration
router.post("/register", async (req, res) => {
  const {
    username,
    email,
    password,
    phone,
    resume,
    linkedIn,
    gitHub,
    gender,
    address,
    workExperience,
    education,
    skills
  } = req.body;

  try {
    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASS_SEC
    ).toString();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      resume,
      linkedIn,
      gitHub,
      gender,
      address,
      workExperience,
      education,
      skills
    });

    const savedUser = await newUser.save();
    return res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error:", error); // Log the error for debugging
    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  const {
    username,
    password
  } = req.body;

  try {
    const user = await User.findOne({
      username
    });
    if (!user) {
      return res.status(400).json({
        error: "User Not Found"
      });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);
    if (password === decryptedPassword) {
      const accessToken = jwt.sign({
          id: user._id
        },
        process.env.JWT_SEC, {
          expiresIn: "7d"
        }
      );
      const {
        password,
        ...others
      } = user._doc;

      return res.json({
        ...others,
        accessToken
      });
    } else {
      return res.status(401).json({
        error: "Wrong Username or Password"
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
});

module.exports = router;