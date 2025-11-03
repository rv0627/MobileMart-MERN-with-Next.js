const User = require("./models/userModel");
const bcrypt = require("bcrypt");

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    res.status(200).json({
      message: "Login successfull!",
      userId: user.userId,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const createUser = async (req, res) => {
  const existingUser = await User.findOne({
    $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User with given email or mobile already exists",
    });
  }

  const userData = new User({
    id: req.body.id,
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    password: req.body.password,
  });

  await userData
    .save()
    .then(() => {
      res.status(201).json({
        message: "User added successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

module.exports = {
    createUser,
    userLogin,
};