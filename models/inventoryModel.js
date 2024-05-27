const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "Inventory is Required"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood Group is Required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is Required"],
    },
    donarEmail:{
      type:String,
      required:[true,"Donar Email is Required"]
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Organization is Required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      //  b  
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
