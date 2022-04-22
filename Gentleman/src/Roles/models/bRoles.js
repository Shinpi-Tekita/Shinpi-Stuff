const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
guild: String,
roles: Array,
})
module.exports = mongoose.model('broles', Schema);
