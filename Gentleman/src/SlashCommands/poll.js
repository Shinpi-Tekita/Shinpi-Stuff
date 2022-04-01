const { MessageEmbed } = require('discord.js');

module.exports = {
name: 'poll',
description: 'Creates a poll with many options',
options: [
{
name: 'title',
description: 'The title of poll',
type: 'STRING',
required: true,
},
{
name: 'choice1',
description: 'A choice',
type: 'STRING',
required: true,
},
{
name: 'choice2',
description: 'A choice',
type: 'STRING',
required: true,
},
{
name: 'choice3',
description: 'A choice',
type: 'STRING',
required: false,
},
{
name: 'choice4',
description: 'A choice',
type: 'STRING',
required: false,
},
{
name: 'choice5',
description: 'A choice',
type: 'STRING',
required: false,
},
{
name: 'choice6',
description: 'A choice',
type: 'STRING',
required: false,
},
{
name: 'choice7',
description: 'A choice',
type: 'STRING',
required: false,
},
{
name: 'choice8',
description: 'A choice',
type: 'STRING',
required: false,
},
{
name: 'choice9',
description: 'A choice',
type: 'STRING',
required: false,
},
{
name: 'choice10',
description: 'A choice',
type: 'STRING',
required: false,
},
],
run: async (client, interaction, args) => {
title = interaction.options.getString('title');
c1 = interaction.options.getString('choice1');
c2 = interaction.options.getString('choice2');
c3 = interaction.options.getString('choice3');
c4 = interaction.options.getString('choice4');
c5 = interaction.options.getString('choice5');
c6 = interaction.options.getString('choice6');
c7 = interaction.options.getString('choice7');
c8 = interaction.options.getString('choice8');
c9 = interaction.options.getString('choice9');
c10 = interaction.options.getString('choice10');
const pollCreateEmbed = new MessageEmbed()
.setTitle(`**${title}**`)
.setColor("#6F8FAF")
.addFields(
{ value: '\u200b', name: `1️⃣${c1}`,
},
{ value: '\u200b',
name: `2️⃣${c2}` }
)
.setTimestamp();

if (interaction.options.getString('choice3')) {
pollCreateEmbed.addFields({
value: '\u200b',
name: `3️⃣${c3}`, 
});
}
if (interaction.options.getString('choice4')) {
pollCreateEmbed.addFields({
value: '\u200b',
name: `4️⃣${c4}`,
});
}
if (interaction.options.getString('choice5')) {
pollCreateEmbed.addFields({
value: '\u200b',
name: `5️⃣${c5}`
});
}
if (interaction.options.getString('choice6')) {
pollCreateEmbed.addFields({
value: '\u200b',
name: `6️⃣${c6}`,
});
}
if (interaction.options.getString('choice7')) {
pollCreateEmbed.addFields({
value: '\u200b',
name: `7️⃣${c7}`,
});
}
if (interaction.options.getString('choice8')) {
pollCreateEmbed.addFields({
value: '\u200b',
name: `8️⃣${c8}`,
});
}
if (interaction.options.getString('choice9')) {
pollCreateEmbed.addFields({
value: '\u200b',
name: `9️⃣${c9}`,
});
}
if (interaction.options.getString('choice10')) {
pollCreateEmbed.addFields({
value: '\u200b',
name: `🔟${c10}`,
});
}

embedMessage = await interaction.reply({
content: `📊 ${interaction.user} started a poll`, 
embeds: [pollCreateEmbed],
fetchReply: true,
});
embedMessage.react('1️⃣');
embedMessage.react('2️⃣');

if (interaction.options.getString('choice3')) {
embedMessage.react('3️⃣');
}
if (interaction.options.getString('choice4')) {
embedMessage.react('4️⃣');
}
if (interaction.options.getString('choice5')) {
embedMessage.react('5️⃣');
}
if (interaction.options.getString('choice6')) {
embedMessage.react('6️⃣');
}
if (interaction.options.getString('choice7')) {
embedMessage.react('7️⃣');
}
if (interaction.options.getString('choice8')) {
embedMessage.react('8️⃣');
}
if (interaction.options.getString('choice9')) {
embedMessage.react('9️⃣');
}
if (interaction.options.getString('choice10')) {
embedMessage.react('🔟');
}
},
};
