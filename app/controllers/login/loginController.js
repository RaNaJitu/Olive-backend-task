const userModel = require("../../models/user/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (email == null || email == "" || password == null || password == "") {
    res.status(400);
    return res.status(400).send("email/password can not be empty");
  }

  const user = await userModel.findOne({ email: req.body.email });
  console.log("user is", user);
  if (user === null) return res.status(400).send("email is not valid");
  console.log(await bcrypt.compare(password, user.password));
  if (await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.cookie("jwt", accessToken, {
      expires: new Date(Date.now() + 30000),
      httpOnly: true,
    });
    return res.status(200).json({ accessToken, userDetails: user });
  } else {
    return res.status(400).send("email or password is not valid");
  }
};

module.exports = {
  login,
};
