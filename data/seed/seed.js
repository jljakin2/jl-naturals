const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Product = require("./Product.js");
const Inventory = require("./Inventory.js");

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI); // add the dotenv package to use process.env

    // Read data from products file
    const productsPath = path.join(__dirname, "products.json");
    const jsonProductsData = fs.readFileSync(productsPath, "utf-8");
    const products = JSON.parse(jsonProductsData);

    // Read data from inventory file
    const inventoryPath = path.join(__dirname, "inventory.json");
    const jsonInventoryData = fs.readFileSync(inventoryPath, "utf-8");
    const inventory = JSON.parse(jsonInventoryData);

    // Clear existing data
    await Product.deleteMany({});
    await Inventory.deleteMany({});

    // Insert data from JSON file
    await Product.insertMany(products);
    await Inventory.insertMany(inventory);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
}

// Run the seed function
seedDatabase();

module.exports = seedDatabase;
