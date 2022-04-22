const client = require("../index");
const br = require("../models/bRoles");
const { MessageEmbed } = require('discord.js') 

client.on("interactionCreate", async (interaction) => {
if(interaction.isSelectMenu()) {
if(interaction.customId !== 'reaction-roles')return;
const roleId = interaction.values[0];
const role = interaction.guild.roles.cache.get(roleId)
const memberRoles = interaction.member.roles;

const hasRole = memberRoles.cache.has(roleId);
if(hasRole){
memberRoles.remove(roleId).catch(err => null);
 interaction.reply({ content: `<@&${role.id}> has been removed from you`, ephemeral: true })
} else {
memberRoles.add(roleId).catch(err => null);
interaction.reply({ content: `<@&${role.id}> has been added to you`, ephemeral: true })
}
}
if(interaction.isButton()) {
let data = await br.findOne({ guild: interaction.guildId })
if(!data)return
if(!data?.roles)return
if(data.roles.find(v => v.customId === interaction.customId)){

const rolename = interaction.customId;
const role = interaction.guild.roles.cache.find(r => r.name === rolename)
const memberRoles = interaction.member.roles;
const hasRole = memberRoles.cache.has(role.id);
if(hasRole){
memberRoles.remove(role.id).catch(err => {});
interaction.reply({ content: `<@&${role.id}> has been removed from you`, ephemeral: true })
} else {
memberRoles.add(role.id).catch(err => {});
interaction.reply({ content: `<@&${role.id}> has been added to you`, ephemeral: true })
}
}
}
});
