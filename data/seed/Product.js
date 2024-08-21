const mongoose = require("mongoose");
const toJSON = require("./toJSON.js");

const productSchema = new mongoose.Schema(
  {
    SKU: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    kind: {
      type: String,
      required: true,
      trim: true,
    },
    customer: {
      type: String,
      required: true,
      trim: true,
    },
    NDA: {
      type: Boolean,
      default: false,
    },
    UPC: {
      type: String,
      trim: true,
    },
    hsCode: {
      type: String,
      trim: true,
    },
    broadCode: {
      type: String,
      trim: true,
    },
    scent: {
      type: String,
      trim: true,
    },
    scentCode: {
      type: String,
      trim: true,
    },
    maxBatchSize: {
      type: Number,
    },
    meltTemp: {
      type: Number,
    },
    fillTemp: {
      type: Number,
    },
    skinRegimen: {
      type: String,
      trim: true,
    },
    hairRegimen: {
      type: String,
      trim: true,
    },
    containerType: {
      type: String,
      trim: true,
    },
    containerDimensions: {
      type: String,
      trim: true,
    },
    containerSize: {
      type: Number,
    },
    productSize: {
      type: Number,
    },
    microbial: {
      type: String,
      trim: true,
    },
    testing2: {
      type: String,
      trim: true,
    },
    testing3: {
      type: String,
      trim: true,
    },
    labels: [
      {
        type: {
          type: String,
          trim: true,
        },
        size: {
          type: String,
          trim: true,
        },
      },
    ],
    sealType: {
      type: String,
      trim: true,
    },
    sealAmount: {
      type: Number,
    },
    scoop: {
      type: Boolean,
      default: false,
    },
    containmentBox: {
      color: {
        type: String,
        trim: true,
      },
      size: {
        type: String,
        trim: true,
      },
    },
    tulipLinerSize: {
      type: String,
      trim: true,
    },
    finalProductWeight: {
      type: Number,
    },
    shippingBox: {
      size: {
        type: String,
        trim: true,
      },
      quantity: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
