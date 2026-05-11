const mongoose = require('mongoose');
const connectDB = require('./db');
const { initialInventory, initialUsers } = require('../src/data/dummyData');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const InventoryItem = require('./models/InventoryItem');

connectDB();

const importData = async () => {
  try {
    // Clear existing
    await User.deleteMany();
    await InventoryItem.deleteMany();

    // Users
    const hashedUsers = await Promise.all(initialUsers.map(async (u) => ({
      ...u,
      password: await bcrypt.hash(u.password, 12)
    })));
    await User.insertMany(hashedUsers);

    // Inventory
    await InventoryItem.insertMany(initialInventory);

    console.log('Data seeded');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();

