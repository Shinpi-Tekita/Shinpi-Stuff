const mongoose = require("mongoose")

const config = mongoose.Schema({
guild: {
type: String,
required: true
},
leveling: Boolean,
roles: Array,
})

module.exports = mongoose.model("config", config)
