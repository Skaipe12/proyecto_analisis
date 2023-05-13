// Import required packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Create an instance of the Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming request bodies as JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rafaelarango66:Arangorafa123@ayds.ac9nr1v.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error(err);
});

// Define routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Define a schema for the MongoDB collection
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Define a model for the MongoDB collection
const User = mongoose.model('users', userSchema);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});