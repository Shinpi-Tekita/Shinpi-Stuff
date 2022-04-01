const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "pp",
  description: "🍆",
  run: async (client, interaction, args) => {
  var pps = ['=', '=', '=','==','==','==','==','===','===','===','===','====','====','====','====','====','=====','=====','=====','======','======','=======','=======','========'];
    
var random = Math.floor(Math.random() * pps.length);
var pp = pps[random];
