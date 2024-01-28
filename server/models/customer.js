const mongoose = require("mongoose");
const transaction = require("./transaction")
const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true

  },
  surname:{
    type: String,
    required: true

  },
  accountNo:{
    type: Number,
    required: true,
    unique: true
  },
  balance:{
    type: Number,
    default: 0
  },

  refresh_token: String
});

const customerModel = mongoose.model("customers", customerSchema);
module.exports = customerModel;
