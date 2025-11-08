const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;
    const secret = process.env.JWT_SECRET || 'dev_jwt_secret_for_local';
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, secret, { expiresIn: '7d' });

    const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = `${frontend.replace(/\/$/, '')}/auth/success?token=${encodeURIComponent(token)}&name=${encodeURIComponent(
      user.name || ''
    )}&email=${encodeURIComponent(user.email || '')}&userId=${encodeURIComponent(user._id)}`;

    return res.redirect(redirectUrl);
  }
);

module.exports = router;
