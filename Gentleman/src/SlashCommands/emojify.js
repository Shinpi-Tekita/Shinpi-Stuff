module.exports = {
  name: "emojify",
  description: "Emojify your text",
  options: [
  {
name: "text",
description: "text to emojify",
type: 'STRING',
required: true
  }
  ],
  run: async (client, interaction, args) => {
    
const mapping = {
  ' ': '   ',
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
  '!': ':grey_exclamation:',
  '?': ':grey_question:',
  '#': ':hash:',
  '*': ':asterisk:'
};
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
})
    const text = interaction.options.getString('text');

 await interaction.reply(text.split('').map(c => mapping[c] || c).join(''));

  },
};
