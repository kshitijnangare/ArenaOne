const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPw });
    await user.save();
    res.status(201).json({ success: true, user: { id: user._id, name, email, role: user.role } });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: user._id, name: user.name, email, role: user.role, arenaCredits: user.arenaCredits } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

