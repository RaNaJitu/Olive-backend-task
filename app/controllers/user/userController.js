const userModel = require("../../models/user/user");

const bcrypt = require("bcrypt");

const getAllUsers = (req, res) => {
  console.log("controller is called");
  userModel
    .find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error is occurred while creating the user",
      });
    });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  console.log("id===>", id);

  userModel
    .findById(id)
    .then((user) => {
      if (user) res.send(user);
      else {
        res.status(404).send({
          message: "User not found",
        });
      }
    })
    .catch((err) => {
      res.status(404).send({
        message: err.message || "User not found",
      });
    });
};

const createUser = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  let userAvailable;
  if (req.body.email) {
    userAvailable = await userModel.findOne({ email: req.body.email });
  }
  console.log("userAvailable", userAvailable);
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log("Hashed Password: ", hashedPassword);

  const userData = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    gender: req.body.gender,
    address: req.body.address,
  });

  userData
    .save(userData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error is occurred while creating the user",
      });
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  console.log("id====>", id);
  console.log("USER DETAILS", req.user);
  if (req.user.role !== 1) {
    res.status(200).send({ message: "You are not authorized people" });
    return;
  }
  userModel
    .findByIdAndDelete(id)
    .then((user) => {
      if (user) {
        res.status(200).send({ message: "User deleted successfully" });
      } else {
        res
          .status(404)
          .send({ message: `User deleted UnSuccessfully check id:=> ${id}` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error is occurred while DELETE the user",
      });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  //   updateUser,
  deleteUser,
};
