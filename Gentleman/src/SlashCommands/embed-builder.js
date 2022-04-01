let { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Permissions } = require("discord.js")
module.exports = {
name: 'embed-builder',
description: 'Build an embed',
options: [
{
name: 'channel',
type: 'CHANNEL',
description: 'channel to send the embed',
channelTypes:["GUILD_TEXT","GUILD_NEWS"] ,     required: true
},
{
name: 'title',
type: 'STRING',
description: 'the embed title',
required: true
},
{
name: 'description',
type: 'STRING',
description: 'the embed description',
required: true
},
{
name: 'color',
type: 'STRING',
description: 'the embed color'
},
{
name: 'field1',
type: 'STRING',
description: 'an embed field',
},
{
name: 'field2',
type: 'STRING',
description: 'an embed field',
},
{
name: 'field3',
type: 'STRING',
description: 'an embed field',
},
],
run: async (client, interaction, args) => {

const channel = interaction.options.getChannel("channel");
const title = interaction.options.getString("title");
const description = interaction.options.getString("description");
const color = interaction.options.getString("color");
const field1 = interaction.options.getString("field1");
const field2 = interaction.options.getString("field2");
const field3 = interaction.options.getString("field3");
  
let embed = new MessageEmbed()
  
let embed2 = new MessageEmbed()
.setColor("#6F8FAF");
  
if(!interaction.member.permissionsIn(channel).has("SEND_MESSAGES"))return interaction.reply({ embeds: [embed2.setDescription(`**You Do Not Have Permissions To Talk In That Channel**`)], ephemeral: true })

if(!interaction.guild.me.permissionsIn(channel).has("SEND_MESSAGES"))return interaction.reply({ embeds: [embed2.setDescription(`**I Do Not Have Permissions To Talk In That Channel**`)], ephemeral: true })
  
embed.setTitle(title)
embed.setDescription(description)
embed.setFooter(`Embed Sent By ${interaction.user.username}`)
embed.setTimestamp()

if(color){
if(!color.startsWith("#") || color.length !== 7)return interaction.reply({ embeds: [embed2.setDescription(`**You Did Not Provide A Valid [Hex Code](https://htmlcolorcodes.com/)**`)], ephemeral: true })
embed.setColor(color)
}

if(field1){
embed.addFields({
value: '\u200b',
name: `${field1}`,
});
}

if(field2){
embed.addFields({
value: '\u200b',
name: `${field2}`,
});
}

if(field3){
embed.addFields({
value: '\u200b',
name: `${field3}`,
});
}

channel.send({ embeds: [embed] })

interaction.reply({ embeds: [embed2.setDescription(`**Embed Was Successfully Sent To ${channel}**`)], ephemeral: true })
  
},
};
