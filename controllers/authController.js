
const User = require('../models/User');
const bcrypt = require('bcrypt'); // For password hashing

exports.login = async (req, res) => {
  try {
    // Extract login data from the request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If the user and password are valid, create a session or JWT token for authentication
    // You can use a library like Passport.js for session-based authentication or implement JWT-based authentication

    // For example, with JWT:
    res.status(200).json({ user });

    // You may also set a session cookie for session-based authentication
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.register = async (req, res) => {
  try {
    // Extract user registration data from the request body
    const { username, email, password, dateOfBirth } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }



        // Hash the user's password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // Create a new user document using the Mongoose model
        const newUser = new User({
          username,
          email,
          password: hashedPassword, // Store the hashed password
          dateOfBirth: new Date(dateOfBirth),
        });
    

    // Save the user document to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
