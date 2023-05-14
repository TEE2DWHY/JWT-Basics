const jwt = require("jsonwebtoken");
const authMiddleWear = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
    if (!authHeader || !authHeader.startsWith("")) {
      res.status(401).json({ msg: "no token is provided" });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = user;
    req.user = { id, username };
    next();
  } catch (err) {
    res.status(401).json({ msg: `unauthorized` });
  }
};

module.exports = authMiddleWear;
