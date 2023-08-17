const userModel = require("../../models/user/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "required fields are mandatory" });
    return;
  }
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    res.status(400).send({ message: "email/password can not be empty" });
  }

  const user = await userModel.findOne({ email: req.body.email });
  console.log("user is", user);

  if (user && (await bcrypt.compare(password, user.password))) {
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
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    res.status(400).send({ message: "email or password is not valid" });
  }
};

module.exports = {
  login,
};
