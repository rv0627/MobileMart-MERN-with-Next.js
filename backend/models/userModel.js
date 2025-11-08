const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    userId: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    provider: {
      type: String, // "google"
    },
    providerId: {
      type: String, // google unique id
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.plugin(AutoIncrement, { inc_field: "userId" });

userSchema.index({ mobile: 1 }, { unique: true, sparse: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
