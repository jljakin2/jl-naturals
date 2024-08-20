const mongoose = require("mongoose");
const toJSON = require("./toJSON.js");

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Wax Detail",
        "Solid Carrier Oil Detail",
        "Liquid Carrier Oil Detail",
        "Emulsifier Detail",
      ],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    collection: "inventory",
  }
);

// add plugin that converts mongoose to json
inventorySchema.plugin(toJSON);

module.exports =
  mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);
