const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
      match: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
      unique: true,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
      require: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
