const { User, Product, Transaction } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        // Handle or log the error
        throw new Error("Error fetching users");
      }
    },
    products: async () => {
      try {
        return await Product.find();
      } catch (error) {
        // Handle or log the error
        throw new Error("Error fetching products");
      }
    },
    transactions: async () => {
      try {
        return await Transaction.find();
      } catch (error) {
        // Handle or log the error
        throw new Error("Error fetching transactions");
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        return user;
      } catch (error) {
        // Handle or log the error
        throw new Error("Error creating user");
      }
    },
    addProduct: async (parent, args) => {
      try {
        const product = await Product.create(args);
        return product;
      } catch (error) {
        // Handle or log the error
        throw new Error("Error creating product");
      }
    },
    addTransaction: async (parent, args) => {
      try {
        const transaction = await Transaction.create(args);
        return transaction;
      } catch (error) {
        // Handle or log the error
        throw new Error("Error creating transaction");
      }
    },
  },
};

module.exports = resolvers;
