let { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Permissions } = require("discord.js")
let wrong = "#F04A47"
module.exports = {
  name: "poll",
  timeout: 5,
  run: async (client, message) => {

const options = [
  '🇦',
  '🇧',
  '🇨',
  '🇩',
  '🇪',
  '🇫',
  '🇬',
  '🇭',
  '🇮',
  '🇯',
  '🇰',
  '🇱',
  '🇲',
  '🇳',
  '🇴',
  '🇵',
  '🇶',
  '🇷',
  '🇸',
  '🇹',
  '🇺',
  '🇻',
  '🇼',
  '🇽',
  '🇾',
  '🇿',
];
    
const args = message.content.trim().split(/ +/g);

if(!args){
  let embed = new MessageEmbed()
        .setDescription(`Please Provide An Title`)
        .setColor("#6F8FAF")
    return message.reply({ embeds: [embed] })
}

let question = [];

for (let i = 1; i < args.length; i++) {
  if (args[i].startsWith('"')) break;
  else question.push(args[i]);
}

question = question.join(' ');

const choices = [];

const regex = /(["'])((?:\\\1|\1\1|(?!\1).)*)\1/g;
let match;
while (match = regex.exec(args.join(' '))) choices.push(match[2]);

let content = [];
for (let i = 0; i < choices.length; i++) content.push(`${options[i]} ${choices[i]}`);
content = content.join('\n');

var embed = new MessageEmbed()
  .setColor('#8CD7FF')
  .setTitle(`**${question}**`)
  .setDescription(`${content}`);

message.channel.send({ content:`:bar_chart: ${message.author} started a poll.`, embeds: [embed] })
  .then(async m => {
    for (let i = 0; i < choices.length; i++) await m.react(options[i]);
  });
    message.delete()
  }
}
