const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

module.exports.Signup = async (req, res, next) => {
  try {
    const { name ,email, password } = req.body;
    // Check if email, password, and username are provided
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Email, password, and username are required." });
    }

    // Log the inputs for debugging
    console.log("Received data: ", { name ,email, password});

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Check if password is a valid string
    if (typeof password !== 'string') {
      return res.status(400).json({ message: "Password must be a string." });
    }

    console.log("Password before hashing:", password);

    const hashedPassword = await bcrypt.hash(password, 12);

    console.log("Hashed password:", hashedPassword);

    const user = await User.create({ name , email, password});

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ message: "User signed in successfully", success: true, user });

    next();
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
      const { email, password } = req.body;

      console.log('Login request received:', { email });

      if (!email || !password) {
          console.log('Missing email or password:', { email, password });
          return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await User.findOne({ email });

      if (!user) {
          console.log('User not found:', { email });
          return res.status(401).json({ message: 'Incorrect email or password' });
      }

      const auth = (password, userPassword) => {
        try {
            // Compare the provided password with the user's password
            const result = password === userPassword;
            return result;
        } catch (error) {
            // Handle any errors that occur during the comparison
            console.error('Error during password comparison:', error);
            throw error; // Throw the error to be handled by the caller
        }
    };
    
      if (!auth) {
          console.log('Incorrect password:', { email });
          return res.status(401).json({ message: 'Incorrect email or password' });
      }

      const token = createSecretToken(user._id);

      console.log('User logged in successfully:', { email });

      res.cookie('token', token, {
          withCredentials: true,
          httpOnly: false,
      });
      
      res.status(201).json({ message: 'User logged in successfully', success: true });
      next();
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports.Profile = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, '12345678', async (err, decoded) => {
        if (err) {
          return res.status(401).json({ status: false, message: 'Invalid token' });
        }

        try {
          const user = await User.findById(decoded.id);
          if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
          }

          res.cookie('token', token, {
            withCredentials: false, // Add withCredentials option
            httpOnly: false,
          });

          res.status(200).json({ user });
        } catch (dbError) {
          console.error('Database error during profile fetch', dbError);
          res.status(500).json({ status: false, message: 'Internal server error' });
        }
      });
    } else {
      res.status(401).json({ status: false, message: 'No token provided' });
    }
  } catch (error) {
    console.error('Error during profile fetch', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};