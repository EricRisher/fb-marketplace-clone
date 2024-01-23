const { User, Product, Transaction } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find();
        },
        products: async () => {
            return await Product.find();
        },
        transactions: async () => {
            return await Transaction.find();
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        addProduct: async (parent, args) => {
            const product = await Product.create(args);
            return product;
        },
        addTransaction: async (parent, args) => {
            const transaction = await Transaction.create(args);
            return transaction;
        },
    },
};

module.exports = resolvers;