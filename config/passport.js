const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../backend/models/userModel");

module.exports = function (passport) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_CALLBACK_URL) {
    console.warn(
      'Google OAuth env vars missing; registering a MOCK GoogleStrategy for local development.\n' +
        'Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALLBACK_URL in your .env to enable real Google OAuth.'
    );

    const MockStrategy = function () {};
    MockStrategy.prototype.name = 'google';
    MockStrategy.prototype.authenticate = function (req, options) {

        const isInitial = req.path && req.path.endsWith('/google') && !req.query.mock;
      if (isInitial) {
        return this.redirect('/api/auth/google/callback?mock=1');
      }

      if (req.query && req.query.mock) {
        const fakeUser = {
          _id: 'mock-user-1',
          name: 'Local Dev User',
          email: 'dev@example.com',
        };
        return this.success(fakeUser);
      }

      return this.fail('MockStrategy: unsupported request', 400);
    };

    passport.use(new MockStrategy());
    passport.serializeUser((user, done) => done(null, user.id || user._id || user));
    passport.deserializeUser((id, done) => done(null, { _id: id }));
    return;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ providerId: profile.id });
          if (user) return done(null, user);

          const email = profile.emails && profile.emails[0] && profile.emails[0].value;
          if (email) {
            user = await User.findOne({ email: email });
            if (user) {
              let changed = false;
              if (!user.provider) { user.provider = 'google'; changed = true; }
              if (!user.providerId) { user.providerId = profile.id; changed = true; }
              if (!user.avatar && profile.photos && profile.photos[0]) { user.avatar = profile.photos[0].value; changed = true; }
              if (changed) await user.save();
              return done(null, user);
            }
          }

          const newUser = await User.create({
            name: profile.displayName,
            email: email,
            provider: "google",
            providerId: profile.id,
            avatar: profile.photos && profile.photos[0] && profile.photos[0].value,
          });

          return done(null, newUser);
        } catch (err) {
          if (err && err.code === 11000) {
            try {
              const fallback = await User.findOne({ $or: [{ providerId: profile.id }, { email: profile.emails && profile.emails[0] && profile.emails[0].value }] });
              if (fallback) return done(null, fallback);
            } catch (e) {
            }
          }
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user)).catch((err) => done(err));
  });
};