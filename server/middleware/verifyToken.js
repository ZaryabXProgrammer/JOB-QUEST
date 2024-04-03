const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SEC);

      if (user) {
        req.user = user;

        next();
      }
    } catch (error) {
      res.status(401).json("Access Token is Not Valid: ");
    }
  } else {
    return res.status(401).json("User Not Authenticated");
  }
};
const verifyTokenandAuthorization = (req, res, next) => {
  const { userId } = req.body;
  verifyToken(req, res, () => {
    if (req.user.id === userId) {
      next();
    } else {
      res.status(403).json("Not Allowed to Update");
    }
  });
};

module.exports = { verifyToken, verifyTokenandAuthorization };
