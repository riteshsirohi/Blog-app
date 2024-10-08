const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      //validation
      if (!username || !email || !password) {
        return res.status(400).send({
          success: false,
          message: "Please Fill all fields",
        });
      }
      //exisiting user
      const exisitingUser = await userModel.findOne({ email });
      if (exisitingUser) {
        return res.status(401).send({
          success: false,
          message: "user already exisits",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      //save new user
      const user = new userModel({ username, email, password: hashedPassword });
      await user.save();
      return res.status(201).send({
        success: true,
        message: "New User Created",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error In Register callback",
        success: false,
        error,
      });
    }
  };
  


  exports.getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find({});
      return res.status(200).send({
        userCount: users.length,
        success: true,
        message: "all users data",
        users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Get ALl Users",
        error,
      });
    }
  };


  exports.loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(401).send({
          success: false,
          message: "Please provide email or password",
        });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        console.log("User not found with email:", email); // Add this log
        return res.status(200).send({
          success: false,
          message: "Email is not registered",
        });
      }
      //password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Password mismatch for user:", email); // Add this log
        return res.status(401).send({
          success: false,
          message: "Invalid username or password",
        });
      }
      console.log("User logged in successfully:", user._id); // Add this log
      return res.status(200).send({
        success: true,
        message: "Login successfully",
        user,
      });
    } catch (error) {
      console.log("Error in login callback:", error); // Add this log
      return res.status(500).send({
        success: false,
        message: "Error In Login Callback",
        error,
      });
    }
  }