const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: false, default: 0 },
    category: { type: String, required: true },
    imageUrl: { type: String, required: false },
    seller: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);