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

  // Check if userId is not in req.body and exists in req.params
  if (!userId && req.params.userId) {
    const { userId: paramUserId } = req.params;
    // Use paramUserId for further processing
    verifyToken(req, res, () => {
      if (req.user.id === paramUserId) {
        // User ID verification logic when userId is from req.params
        next(); // Pass control to the next middleware or route handler
      } else {
        res.status(403).json({ message: 'Unauthorized' });
      }
    });


  }

  else {
    // Use userId from req.body for further processing
    verifyToken(req, res, () => {
      if (req.user.id === userId) {
        // User ID verification logic when userId is from req.body
        next(); // Pass control to the next middleware or route handler
      } else {
        res.status(403).json({ message: 'Unauthorized' });
      }
    });
  }
}

module.exports = { verifyToken, verifyTokenandAuthorization };
