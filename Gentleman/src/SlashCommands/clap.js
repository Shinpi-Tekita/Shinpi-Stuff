const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "clap",
  description: "if your happy and you know it clap your hands π",
  options: [
      {
          name: "text",
          description: "πHelloπ",
          type: 'STRING',
          required: true
      }
  ],
  run: async (client, interaction, args) => {
const sentence = interaction.options.getString('text');
let clap = sentence.split(' ').join('π')
   
let embed = new MessageEmbed()
.setDescription(`π${clap}π`)
.setColor("#6F8FAF")
await interaction.reply({embeds: [embed]})
  },
};
