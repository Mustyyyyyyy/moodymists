const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, default: "" },

    notes: [{ type: String }],        
    size: { type: String, default: "" }, 
    burnTime: { type: String, default: "" }, 

    imageUrl: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },

    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);