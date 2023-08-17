const UniversityModel = require("../../models/university/university");

const getAllUniversity = (req, res) => {
  let cond = {};
  if (req.query.type) {
    cond = {
      isWishlist: req.query.type,
    };
  }
  UniversityModel.find(cond)
    .then((universityData) => {
      if (universityData.length > 0) res.status(200).send(universityData);
      else res.status(404).send("universityData Not Found");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error is occurred while Fetch university data:",
      });
    });
};

const updateWishlist = (req, res) => {
  console.log("updateWishlist is called");
  let cond = {};
  if (!(req.query.universityId && req.query.isWishlist)) {
    res.status(400).send("universityId/isWishlist is minatory fields");
  }
  UniversityModel.findOneAndUpdate(
    { _id: req.query.universityId },
    { isWishlist: req.query.isWishlist }
  )
    .then((universityData) => {
      console.log(universityData);
      if (Object.keys(universityData).length === 0) {
        res.status(400).send({ message: "universityData Not Found" });
        return;
      }
      if (req.query.isWishlist === "true" || req.query.isWishlist === true) {
        res.status(200).send("university added in your wistList");
      } else res.status(200).send("university remove in your wistList");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error is occurred while WishLst university data:",
      });
    });
};

module.exports = {
  getAllUniversity,
  updateWishlist,
};
