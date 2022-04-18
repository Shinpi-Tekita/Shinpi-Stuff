const mongoose = require("mongoose")

const xp = mongoose.Schema({
guId: {
type: String,
required: true
},
user: String,
level:  Number,
xp: Number,
})

module.exports = mongoose.model("leveling", xp)
