import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

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
  }
);

// add plugin that converts mongoose to json
inventorySchema.plugin(toJSON);

export default mongoose.models.Inventory ||
  mongoose.model("Inventory", inventorySchema);
