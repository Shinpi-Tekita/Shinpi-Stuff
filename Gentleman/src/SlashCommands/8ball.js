const {MessageEmbed} = require("discord.js");

module.exports = {
  name: "8ball",
  description: "🎱",
  options: [
      {
          name: "question",
          description: "The question you want to ask the magic 8ball",
          type: 'STRING',
          required: true
      }
  ],
  run: async (client, interaction, args) => {
    const sentence = interaction.options.getString('question');

    var replies = [];

    if(sentence.toLowerCase().startsWith("do")){
   replies = [
       'Maybe.',
	'Certainly not.',
	'Quite likely.',
	'Possibly.',
	'Never, ever, ever.',
	'There is a small chance.',
	'Yes!'
      ];
 } else if(sentence.endsWith("?")){
   replies = [
       'Maybe.',
	'Certainly not.',
	'Sorry but its not happening',
	'There is a good chance.',
	'Quite likely.',
	'I think so.',
	'Never!',
	'Ahaha! Really?!?',
	'Pfft.',
	'Sorry, sir.',
	'The future is uncertain.',
	'I would rather not say.',
	'Who cares?',
	'Possibly.',
	'Never, ever, ever.',
	'There is a small chance.',
	'Yes!'
      ];
 }else if(sentence.toLowerCase().startsWith("should i")){
   replies = [
       'Maybe.',
	'Certainly not.',
	'Never!',
	'I would rather not say.',
	'Who cares?',
	'Never, ever, ever.',
	'Yes!',
  'Yes Do It!',
      ];
      }else if(Number(sentence)){
replies = [
    '????',
    'Sorry please provide a question not numbers',
    '0	1	10	11	100	101	110	111	1000	1001	1010',
    'undefined',
]
} else if(sentence.toLowerCase().startsWith("are you")){
   replies = [
       'Maybe.',
	'Certainly not.',
	'Possibly.',
	'Never, ever, ever.',
	'There is a small chance.',
	'Yes!',
  'No!',
      ];
      }else{
  replies = [
    'No!',
    'Yes!',
    'Certanly',
    'Im uncertain',
    '????',
  ] 
      }

 let embed = new MessageEmbed()
 .setTitle("🎱 8Ball 🎱")
 .addField("🎱 Your Question", `\`${sentence}\``)
 .addField(`🎱 8Ball:`, `\`${replies[Math.floor(Math.random() * replies.length)]}\``)
 .setColor("#6F8FAF")
    
    await interaction.reply({embeds: [embed]})
  },
};
