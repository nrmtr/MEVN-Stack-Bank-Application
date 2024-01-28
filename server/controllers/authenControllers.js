const User = require("../models/customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  // declare var for get request from body
  const { username, password, name, surname, accountNo ,balance } = req.body;
  if(!username || !password  || !name || !username) {
    return res.status(422).json({'message': 'Invalid fields'})
  }
  const genAccountNo = Math.floor(Math.random()*(10^9))
  try {

    // hash password and create user
    hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, name, surname, accountNo: Math.floor(Math.random()*1000000), balance });

    res.sendStatus(201).json({ message: "User created" });
  } catch {}
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(422).json({ message: "Invalid fields" });
    //find username
    const user = await User.findOne({ username });
    if (!user) return res.sendStatus(401).json({ message: "U or p incorrect" });
    //compare password is same
    const match = await bcrypt.compare(password, user.password);

    //check if dosen't match
    if (!match)
      return res
        .status(401)
        .json({ message: "Username or password incorrect" });

    //add jwt token
    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1800s",
      }
    );

    //add refresh token
    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    //declare refresh token to db and save
    user.refresh_token = refreshToken;
    await user.save();
    //setting refresh token expire
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ access_token: accessToken });
  } catch (error) {}
};

const logoutController = async (req, res) => {
  try {
    const cookies = req.cookies;

    const refreshToken = cookies.refresh_token;
    const user = await User.findOne({ refresh_token: refreshToken }).exec();
    // check if not user and
    if (!user) {
      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.sendStatus(204);
    }

    //set user token null
    user.refresh_token = null;
    await user.save();

    // clear token in user
    res.clearCookie("refresh_token", {
      httpOnly: true,
      samesite: "none",
      secure: true,
    });
    res.sendStatus(204);
  } catch (error) {}
};

const refreshController = async (req, res) => {
  try {
    const cookies = req.cookies;
    //check hey do you have cookies ?
    if (!cookies.refresh_token) {
      return res.sendStatus(401);
    }

    const refreshToken = cookies.refresh_token;

    //declare user to find refresh token
    const user = await User.findOne({ refresh_token: refreshToken }).exec();

    //if user dosen't exist send this status
    if (!user) {
      return res.sendStatus(403);
    }

    // check jwt
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.id !== decoded.id) {
          return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
          { id: decoded.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res.json({ access_token: accessToken });
      }
    );
  } catch (error) {}
};

const userController = async (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  refreshController,
  userController,
};
