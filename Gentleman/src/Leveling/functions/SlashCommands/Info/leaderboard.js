const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const xpSchema = require("../../models/leveling")
const config = require('../../models/config')

module.exports = {
name: 'leaderboard',
description: "Check your rank in the xp leaderboard",
run: async (client, interaction, args) => {

let errEmbed = new MessageEmbed()
.setColor("#6F8FAF")
  
let data;
data = await config.findOne({ guild : interaction.guild.id })   

if(!data)return interaction.reply({ embeds: [errEmbed.setDescription(`**This Server Does Not Have Leveling Enabled**`)], ephemeral: true})

let leaderboard = await xpSchema.find({ }).sort( { "level": -1, "xp": -1 } ).then(m => m.filter(data => interaction.guild.members.cache.get(data.user))).catch(error => {
interaction.reply({embeds: [errEmbed.setDescription(`**No One Is In The Leaderboard**`)]})
})
  
let mapped = leaderboard.map((l, i) => { return `\`(#${i + 1})\` • ${client.users.cache.get(`${l.user}`).tag} • LVL ${l.level}` || "User not found"
}) 

let test = mapped.filter(value => {
return value.includes(interaction.user.tag)
})

function ordinal(i){
const j = i % 10;
const k = i % 100;
if (j == 1 && k != 11) return i + "st";
if (j == 2 && k != 12) return i + "nd";
if (j == 3 && k != 13) return i + "rd";
else return i + "th";
};

let place = ordinal(Number(test.join().slice(3, 4)))
  
const lb = new MessageEmbed()
.setTitle(`Xp Leaderboard Of ${interaction.guild.name}`)
.setDescription(`${mapped.slice(0, 10).join("\n").replace("\`(#1)\`", `:first_place: `).replace("\`(#2)\`", `:second_place: `).replace("\`(#3)\`", `:third_place: `)} `)
.setFooter({ text: `You Are In ${place} Place` })
.setColor("#6F8FAF")
  
interaction.reply({embeds: [lb]})
  
},
};
