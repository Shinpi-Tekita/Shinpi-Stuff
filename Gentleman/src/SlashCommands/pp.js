const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "pp",
  description: "🍆",
  run: async (client, interaction, args) => {
  var pps = ['=', '=', '=','==','==','==','==','===','===','===','===','====','====','====','====','====','=====','=====','=====','======','======','=======','=======','========'];
    
var random = Math.floor(Math.random() * pps.length);
var pp = pps[random];

let embed = new MessageEmbed()
.setTitle(`${interaction.user.username}'s pp size`)
.setDescription(`8${pp}D`)
.setColor("#6F8FAF")
await interaction.reply({embeds: [embed]})
  },
};
