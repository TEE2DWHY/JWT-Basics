const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middleWare/asyncWrapper");

const login = asyncWrapper(async (req, res) => {
  const id = new Date().getDate();
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "input fields cannot be empty" });
  }
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "login is successful", token: token });
});

const dashboard = asyncWrapper(async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ msg: "no token found." });
  }
  //get token
  const token = authHeader.split(" ")[1];
  // console.log(token);
  //verify token
  try {
    const userVar = Math.floor(Math.random() * 100);
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      msg: `welcome ${user.username}, your secret number is : ${userVar}`,
    });
  } catch (err) {
    res.status(401).json({ msg: "you're not authorized to access this route" });
  }
});

module.exports = { login, dashboard };
