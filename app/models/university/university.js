const mongoose = require("mongoose");

var UniversitySchema = new mongoose.Schema(
  {
    universityName: {
      type: String,
      require: true,
    },
    courseFees: {
      type: String,
      require: true,
    },
    userReviews: {
      type: String,
      require: true,
    },
    isWishlist: {
      type: Boolean,
      require: true,
    },
    address: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

UniversityModel = mongoose.model("university", UniversitySchema);

module.exports = UniversityModel;
