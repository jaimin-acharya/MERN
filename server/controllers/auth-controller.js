const User = require("../models/user-model");

//* HOME LOGIC
const home = async (req, res) => {
  try {
    res.status(200).send("MERN SERIES Using Router");
  } catch (error) {
    console.log(error);
  }
};

//* REGISTRATION LOGIC
const register = async (req, res) => {
  try {
    // console.log(req.body);

    //? GET REGISTRATION DATA
    const { username, email, phone, password } = req.body;

    //? CHECK EMAIL EXISTANCE
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User Alredy Exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(201).json({
      msg: "Registration Successfull",
      token: await userCreated.genrateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // res.status(500).json("Internal Server Error");
    next(error);
  }
};

//* USER LOGIN LOGIC
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = await userExist.isPasswordValid(password);

    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.genrateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

//* SEND USER DATA- USER LOGIC
const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from user route ${error}`);
  }
};

module.exports = { home, register, login, user };
