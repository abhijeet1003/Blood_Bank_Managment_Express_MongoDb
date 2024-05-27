const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role is Required"],
      enum: ["admin", "ngo", "organization", "donar", "hospital"],
    },
    name: {
      type: String,
      required: function () {
        if (this.role === "donar" || this.role === "admin") {
          return true;
        }
        return false;
      },
    },
    organization: {
      type: String,
      required: function () {
        if (this.role === "organization") {
          return true;
        }
        return false;
      },
    },
    hospitalName: {
      type: String,
      required: function () {
        if (this.role === "hospital") return true;
        return false;
      },
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is Required"],
    },
    phoneNo: {
      type: String,
      required: [true, "PhoneNo is Required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
