const db = require("../config/connection");
const { User, Product, Transaction } = require("../models");
const cleanDB = require("./cleanDB");

const users = require ("./users.json");
const products = require ("./products.json");
const transactions = require ("./transactions.json");

db.once("open", async () => {
  await cleanDB();

  await User.insertMany(users);
  console.log("users seeded");

  await Product.insertMany(products);
  console.log("products seeded");

  await Transaction.insertMany(transactions);
  console.log("transactions seeded");

  process.exit(0);
});
