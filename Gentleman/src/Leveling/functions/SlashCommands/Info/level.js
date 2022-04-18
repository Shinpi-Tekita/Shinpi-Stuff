const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const xpSchema = require("../../models/leveling")
const config = require('../../models/config')


module.exports = {
name: 'level',
description: "Check Your Level",
options: [
{
name: "user",
description: "User to view level",
type: "USER", 
required: false,
},
],
run: async (client, interaction, args) => {

let errEmbed = new MessageEmbed()
.setColor("#6F8FAF")
  
let data;
data = await config.findOne({ guild : interaction.guild.id })   

if(!data)return interaction.reply({ embeds: [errEmbed.setDescription(`**This Server Does Not Have Leveling Enabled**`)], ephemeral: true })

const targer = interaction.options.getUser("user") || interaction.user;
  
function progressBar(value, maxValue, size) {
const percentage = value / maxValue; 
const progress = Math.round((size * percentage)); 
const emptyProgress = size - progress; 

const progressText = '▇'.repeat(progress); 
const emptyProgressText = '—'.repeat(emptyProgress); 
const percentageText = Math.round(percentage * 100) + '%'; 
const bar = '```[' + progressText + emptyProgressText + ']' + percentageText + '```';
return bar;
};

let xp;
xp = await xpSchema.findOne({
guId: `${interaction.guild.id}xp${targer.id}`
})

if(!xp){
xp = await xpSchema.create({
guId: `${interaction.guild.id}xp${targer.id}`,
level: 1,
xp: 0,
});
}
  
var currentXp = xp.xp
var level = xp.level

var mv = level * 500;
var v = currentXp;
  
let embed = new MessageEmbed()
.setTitle(`**${targer.username}'s XP**`)
.setDescription(`**Level: ${level} | XP: ${v}/${mv}\n${progressBar(v, mv, 16)}**`)
.setColor("#6F8FAF")
.setThumbnail(targer.displayAvatarURL({ dynamic: true, format: "png" }))

interaction.reply({embeds: [embed]})
  
},
};
