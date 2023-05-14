const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middleWare/asyncWrapper");
const { StatusCodes } = require("http-status-codes");

const login = asyncWrapper(async (req, res) => {
  const id = new Date().getDate();
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "input fields cannot be empty",
    });
  }
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "login is successful", token: token });
});

const dashboard = asyncWrapper(async (req, res) => {
  console.log(req.user);
  const userVar = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `welcome ${req.user.username}, your secret number is : ${userVar}`,
  });
});

module.exports = { login, dashboard };
