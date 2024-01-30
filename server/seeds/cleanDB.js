const models = require("../models");

module.exports = async () => {
    try {
        await models.User.deleteMany({});
        console.log("Users collection cleared");

        await models.Product.deleteMany({});
        console.log("Products collection cleared");

        await models.Transaction.deleteMany({});
        console.log("Transactions collection cleared");

    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
};