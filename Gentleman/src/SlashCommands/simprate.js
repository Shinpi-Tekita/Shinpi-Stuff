const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
name: 'simp-rate', 
description: 'Simprate 🥺',
options: [
{
name: "user",
description: "user",
type: "USER",
required: false
},
],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
run: async(client, interaction, args) => {
const human = interaction.options.getUser("user") || interaction.user;
const rate = Math.floor(Math.random() * (100 - 1 + 1) + 1);

const Embed2 = new MessageEmbed()
.setColor('#6F8FAF')
.setTitle(`***${human.username}'s Simprate***`)
.setDescription(`${human} is \`${rate}%\` Simp 🥺`)
interaction.reply({ embeds: [Embed2]})
},
} ;
