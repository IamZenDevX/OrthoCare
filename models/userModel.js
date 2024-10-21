const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const{v4:uuidv4} =require('uuid')

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
    required: true,
    default :uuidv4
  },
  name: {
    type: String,
    maxLength: 255,
  },
  email: {
    type: String,
    maxLength: 255,
  },
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
  },
  phone: {
    type: String,
    maxLength: 20,
  },
  date_of_birth: {
    type: Date,
  },
  address: {
    type: String,
    maxLength: 255,
  },
  profile_pic: {
    type: String,
    maxLength: 255,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("user", userSchema);
