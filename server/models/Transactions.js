const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    transactionDate: { type: Date, default: Date.now },
    status: { type: String, default: "pending", enum: ["pending", "completed"], required: true },
    amount: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model("Transaction", transactionSchema);