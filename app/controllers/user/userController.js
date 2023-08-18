const userModel = require("../../models/user/user");

const bcrypt = require("bcrypt");

const getAllUsers = (req, res) => {
  console.log("controller is called");
  userModel
    .find()
    .then((user) => {
      if (user === null) return res.status(204).send("Data not found");
      return res.send(user);
    })
    .catch((err) => {
      return res.status(500).send({
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
  const { email, password, name } = req.body;
  if (email == null || email == "" || password == null || password == "") {
    res.status(400);
    return res.status(400).send("email/password can not be empty");
  }

  let userAvailable;
  if (email) {
    userAvailable = await userModel.findOne({ email: req.body.email });
  }
  // console.log("userAvailable", userAvailable);
  if (userAvailable) {
    return res.status(400).send("User already registered!");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log("Hashed Password: ", hashedPassword);
  console.log("name=====>", name);
  const userData = new userModel({
    name: name,
    email: email,
    password: hashedPassword,
  });

  userData
    .save(userData)
    .then((data) => {
      console.log("data ===>", data);
      return res.send(data);
    })
    .catch((err) => {
      console.log("err====>", err);
      return res.status(500).send({
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
    return res.status(200).send({ message: "You are not authorized people" });
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
      return res.status(500).send({
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
