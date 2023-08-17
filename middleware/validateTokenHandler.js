const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  console.log("authHeader", authHeader);
  if (authHeader === undefined || authHeader === null || authHeader === "") {
    res.status(401).send("Authorization is required");
  }

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log("token", token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json("User is not authorized");
        return;
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
};

module.exports = validateToken;
