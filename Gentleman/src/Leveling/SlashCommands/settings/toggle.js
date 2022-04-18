let { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Permissions, CommandInteraction } = require("discord.js")
const config = require('../../models/config')

module.exports = {
name: "toggle",
description: "toggle leveling",
run: async (client, interaction, args) => {
  
let errEmbed = new MessageEmbed()
.setColor("#6F8FAF")

if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))return interaction.reply({embeds: [errEmbed.setDescription(`**You Do Not Have MANAGE_SERVER Permissions**`)]})
let data;
data = await config.findOne({ guild : interaction.guild.id })    
if(data) {
data.delete()
return interaction.reply({embeds: [errEmbed.setDescription(`**Leveling Has Been Disabled**`)]}) 
} 
if(!data){
data = await config.create({
guild : interaction.guild.id,
leveling: true,
})
data.save()
interaction.reply({ embeds: [errEmbed.setDescription(`**Leveling Has Been Enabled**`)]})
}

},
};
