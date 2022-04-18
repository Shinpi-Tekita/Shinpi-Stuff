let { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Permissions, CommandInteraction } = require("discord.js")
const config = require('../../models/config')

module.exports = {
name: "leveling",
description: "Toggle leveling",
options: [
{
name: "add",
description: "Add leveling roles",
type: "SUB_COMMAND",      
options: [
{
name: 'role',
type: 'ROLE',
description: 'level up role',
required: true
},
{
name: 'level',
type: 'NUMBER',
description: 'level up role level',
required: true
},
],
},
{
name: "list",
description: "List all leveling roles",
type: "SUB_COMMAND",      
},
{
name: "remove",
description: "Remove leveling roles",
type: "SUB_COMMAND",      
options: [
{
name: 'role',
type: 'ROLE',
description: 'level up role',
required: true
},
{
name: 'level',
type: 'NUMBER',
description: 'level up role level',
required: true
},
],
},
],
run: async (client, interaction, args) => {

const { options } = interaction;

const SUB_COMMAND = await options.getSubcommand();

let errEmbed = new MessageEmbed()
.setColor("#6F8FAF")

if (SUB_COMMAND === "add") {
if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))return interaction.reply({embeds: [errEmbed.setDescription(`**You Do Not Have MANAGE_SERVER Permissions**`)]})
let data;
data = await config.findOne({ guild : interaction.guild.id })   

if(!data)return interaction.reply({ embeds: [errEmbed.setDescription(`**This Server Does Not Have Leveling Enabled**`)]})
  
if(data) {
const lvl = interaction.options.getNumber("level")
const role = interaction.options.getRole("role")

if (role.position >= interaction.guild.me.roles.highest.position)return interaction.reply({ embeds: [errEmbed.setDescription(`**I Cant Assign That Role That Is Higher Or Equal To Me**`)], ephemeral: true })
  
let roles = data.roles.find((obj => obj.role == role.id && obj.lvl == lvl))
if(roles)return interaction.reply({ embeds: [errEmbed.setDescription(`**That Role Is Already In The Data**`)]})

await config.findOneAndUpdate({guild: interaction.guild.id},{
$push: {
roles:{
role: role.id, lvl: lvl
}
}
})
interaction.reply({ embeds: [errEmbed.setDescription(`**The Role ${role} Was Successfully Added**`)]})
} 
}  

if (SUB_COMMAND === "remove") {
if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))return interaction.reply({embeds: [errEmbed.setDescription(`**You Do Not Have MANAGE_SERVER Permissions**`)]})
let data;
data = await config.findOne({ guild : interaction.guild.id })   

if(!data)return interaction.reply({ embeds: [errEmbed.setDescription(`**This Server Does Not Have Leveling Enabled**`)]})
if(data) {
const lvl = interaction.options.getNumber("level")
const role = interaction.options.getRole("role")

let roles = data.roles.find((obj => obj.role == role.id && obj.lvl == lvl))

if(!roles)return interaction.reply({ embeds: [errEmbed.setDescription(`**That Role Is Not In The Data**`)]})

await config.findOneAndUpdate({guild: interaction.guild.id},{
$pull: {
roles:{
role: role.id, lvl: lvl
}
}
})
interaction.reply({ embeds: [errEmbed.setDescription(`**The Role ${role} Was Successfully Removed**`)]})
} 
}  
  
if (SUB_COMMAND === "list") {
let data;
data = await config.findOne({ guild : interaction.guild.id })   

if(!data)return interaction.reply({ embeds: [errEmbed.setDescription(`**This Server Does Not Have Leveling Enabled**`)]})
if(data) {
if(data.roles.length === 0)return interaction.reply({ embeds: [errEmbed.setDescription(`**This Server Does Not Have Any Leveling Roles**`)]})
let mapped = await data.roles.map(v => {
return `<@&${v.role}> | ${v.lvl}`;
})
let embed = new MessageEmbed()
.setTitle(`Roles Of ${interaction.guild.name}`)
.setDescription(`${mapped.join("\n")}`)
.setColor("#6F8FAF")
interaction.reply({ embeds: [embed]})
}
}
},
};
