const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "clap",
  description: "if your happy and you know it clap your hands 👏",
  options: [
      {
          name: "text",
          description: "👏Hello👏",
          type: 'STRING',
          required: true
      }
  ],
  run: async (client, interaction, args) => {
const sentence = interaction.options.getString('text');
let clap = sentence.split(' ').join('👏')
   
let embed = new MessageEmbed()
.setDescription(`👏${clap}👏`)
.setColor("#6F8FAF")
await interaction.reply({embeds: [embed]})
  },
};
