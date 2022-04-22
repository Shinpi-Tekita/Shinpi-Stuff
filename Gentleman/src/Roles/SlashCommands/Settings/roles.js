const { MessageEmbed, MessageActionRow, MessageButton, Permissions, MessageSelectMenu } = require("discord.js");
const drModel = require("../../models/dRoles")
const brModel = require("../../models/bRoles")

module.exports = {
name: 'roles',
description: 'Set up roles for your server',
options: [
{
name: "add",
description: "Add roles to a roles panel",
type: "SUB_COMMAND",
userPerms: ['MANAGE_GUILD'],
options: [
{
name: "type",
description:"roles type",
required: true,
type: "STRING",
choices: [
{
name: "Dropdown",
value: "drop"
},
{
name: "Buttons",
value: "button"
},
] 

},
{
name: 'role',
description: 'role to be assigned',
type: 'ROLE',
required: true
},
],
},
{
name: "remove",
description: "Remove roles of a roles panel",
type: "SUB_COMMAND",
userPerms: ['MANAGE_GUILD'],
options: [
{
name: "type",
description:"roles type",
required: true,
type: "STRING",
choices: [
{
name: "Dropdown",
value: "drop"
},
{
name: "Buttons",
value: "button"
},
] 

},
{
name: 'role',
description: 'role to be assigned',
type: 'ROLE',
required: true
},
],
},
{
name: "panel",
description: "Add roles to a roles panel",
type: "SUB_COMMAND",
userPerms: ['MANAGE_GUILD'],
options: [
{
name: "type",
description:"roles type",
required: true,
type: "STRING",
choices: [
{
name: "Dropdown",
value: "drop"
},
{
name: "Buttons",
value: "button"
},
] 
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
const type = interaction.options.getString("type")
const role = interaction.options.getRole("role")
  
if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))return interaction.reply({ embeds: [errEmbed.setDescription(`**You Do Not Have The MANAGE_SERVER Permission**`)], ephemeral: true })

if (role.position >= interaction.guild.me.roles.highest.position) return interaction.reply({content: "I Cant Assign That Role That Is Higher Or Equal To Me", ephemeral: true});

if(type === "drop"){

const da = await drModel.findOne({ guildId: interaction.guild.id })
  
if(da?.roles.length >= 25)return interaction.reply({ embeds: [errEmbed.setDescription(`**This Server Has Reached The Max Ammount Of Dropdown Roles \`25\`**`)] })
  
interaction.reply({ embeds: [errEmbed.setDescription(`**Please Enter A Descripion For The DropDown Role ${role}!**`)] })

let questions = [
"**Please Enter A Descripion For The DropDown Role ${role}**!",
'**Please Enter An Emoji Must Be Discord Emojis No Custom Emojis! Enter none for no emoji**',
'**Succesfully Saved Data Give Me A Moment**'
]

let collector1 = interaction.channel.createMessageCollector({
time: 30000
})

let count = 0;

let setupResult = [];

let nextQuestion = (result) => {
count++
interaction.channel.send({ embeds: [errEmbed.setDescription(questions[count])]})
setupResult.push(result)
}

collector1.on('collect', async m => {
if(m.author.id !== interaction.user.id) return;
if(m.content.toLowerCase() == 'cancel' || m.content.toLowerCase() == 'stop') {
return collector1.stop('cancelled')
} else {
if(count == 0) {
var desc = m.content.trim()
if(desc.toLowerCase() === 'none' || desc.toLowerCase() === 'null' || desc.toLowerCase() === 'no desc') {
desc = null;
return nextQuestion(desc)
}else{
if(desc.length > 100) {
m.reply({ content: `Please Keep The Description Under 100 Characters`, ephemeral: true})
} else {
return nextQuestion(desc)
}
}
} else {
if(count == 1) {
var emoji = m.content
  
let regex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g
if(emoji.toLowerCase() === 'none' || emoji.toLowerCase() === 'null' || emoji.toLowerCase() === 'no emoji') {
emoji = null;
nextQuestion(emoji)
return collector1.stop('set');
}else{
let test = regex.test(emoji)

if(test == false) {
return m.reply(`Please specify a valid emoji!`)
} else {
nextQuestion(emoji)
return collector1.stop('set');
}
}
}
}
}
})

collector1.on('end', async(collected, reason) => {
if(reason === 'time')return;
if(reason === 'cancelled')return;
if(reason === 'set') {
let [desc, emoji] = setupResult;

const guildData = await drModel.findOne({ guildId: interaction.guild.id})
const newRole = {
roleId: role.id,
desc,
emoji,
}
if (guildData){
var roleData = guildData.roles.find((x) => x.roleId === role.id)
if (roleData) {
roleData = newRole;
} else {
guildData.roles = [...guildData.roles, newRole]
}
await guildData.save()
} else {
await drModel.create({
guildId: interaction.guildId,
roles: newRole
})
}
interaction.channel.send({embeds: [errEmbed.setDescription(`**Created A New DropDown Role: ${role} | Do /roles panel To See The DropDown Roles Panel**`)]})
}
})
}

if(type === "button") {

const da = await brModel.findOne({ guild: interaction.guild.id })

if(da?.roles.length >= 10)return interaction.reply({ embeds: [errEmbed.setDescription(`**This Server Has Reached The Max Ammount Of Button Roles \`10\`**`)] })
  
interaction.reply({ embeds: [errEmbed.setDescription(`**Please Enter A Color For The Button Role ${role}!\nColors Red, Blurple, Grey, Green**`)] })
  
let questions = [
'**Please Enter A Color For The Button Role ${role}!\nColors Red, Blurple, Grey, Green**',
'**Please Enter An Emoji Must Be Discord Emojis No Custom Emojis! Enter none for no emoji**',
'**Succesfully Saved Data Give Me A Moment**'
]

let collector1 = interaction.channel.createMessageCollector({
time: 30000
})

let count = 0;

let setupResult = [];

let nextQuestion = (result) => {
count++
interaction.channel.send({ embeds: [errEmbed.setDescription(questions[count])]})
setupResult.push(result)
}

collector1.on('collect', async m => {
if(m.author.id !== interaction.user.id) return;
if(m.content.toLowerCase() == 'cancel' || m.content.toLowerCase() == 'stop') {
return collector1.stop('cancelled')
} else {
if(count == 0) {
var style = m.content.trim()
if(style.toLowerCase() === 'none' || style.toLowerCase() === 'null' || style.toLowerCase() === 'no color') {
style = 'SECONDARY';
return nextQuestion(style)
}else{
let styles = ['red','blurple','gray','green']
if(!styles.includes(style.toLowerCase())) {
m.reply({ content: `You Did Not Provide An Valid Color Enter \`none\` For A Gray Button`, ephemeral: true})
} else {
if(style.toLowerCase() === 'red')style = 'DANGER'
if(style.toLowerCase() === 'blurple')style = 'PRIMARY'
if(style.toLowerCase() === 'gray')style = 'SECONDARY'
if(style.toLowerCase() === 'green')style = 'SUCCESS'
return nextQuestion(style)
}
}
} else {
if(count == 1) {
var emoji = m.content
  
let regex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g
if(emoji.toLowerCase() === 'none' || emoji.toLowerCase() === 'null' || emoji.toLowerCase() === 'no emoji') {
emoji = null;
nextQuestion(emoji)
return collector1.stop('set');
}else{
let test = regex.test(emoji)

if(test == false) {
return m.reply(`Please specify a valid emoji!`)
} else {
nextQuestion(emoji)
return collector1.stop('set');
}
}
}
}
}
})

collector1.on('end', async(collected, reason) => {
if(reason === 'time')return;
if(reason === 'cancelled')return;
if(reason === 'set') {
let [style, emoji] = setupResult;

const guildData = await brModel.findOne({ guild: interaction.guild.id })
const newRole = {
label: role.name,
customId: role.name,
style,
emoji,
}
if (guildData){
var roleData = guildData.roles.find((x) => x.label === role.name)
if (roleData) {
roleData = newRole;
} else {
guildData.roles = [...guildData.roles, newRole]
}
await guildData.save()
} else {
await brModel.create({
guild: interaction.guildId,
roles: newRole
})
}
interaction.channel.send({embeds: [errEmbed.setDescription(`**Created A New Button Role: ${role} | Do /roles panel To See The Button Roles Panel**`)]})
}
})
}
}
if (SUB_COMMAND === "remove") {
const type = interaction.options.getString("type")
const role = interaction.options.getRole("role")
  
if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))return interaction.reply({ embeds: [errEmbed.setDescription(`**You Do Not Have The MANAGE_SERVER Permission**`)], ephemeral: true })

if(type === "drop"){
const guildData = await drModel.findOne({
guildId: interaction.guildId
})
  
if(!guildData)return interaction.reply({ embeds: [errEmbed.setDescription(`**There Is No Dropdown Roles Inside Of This Server!**`)], ephemeral: true })

const guildRoles = guildData.roles;
  
const findRole = guildRoles.find(x => x.roleId === role.id);

if(!findRole)return interaction.reply({ embeds: [errEmbed.setDescription(`**That Role Is Not In The Dropdown Roles List**`)], ephemeral: true })

const filteredRoles = guildRoles.filter(x => x.roleId !== role.id) 

guildData.roles = filteredRoles;

await guildData.save()

interaction.reply({embeds: [errEmbed.setDescription(`**Removed DropDown Role: ${role} | Do /roles panel To See The DropDown Roles Panel**`)]})
}

if(type === "button"){

const guildData = await brModel.findOne({
guild: interaction.guildId
})
  
if(!guildData)return interaction.reply({ embeds: [errEmbed.setDescription(`**There Is No Button Roles Inside Of This Server!**`)], ephemeral: true })

const guildRoles = guildData.roles;
  
const findRole = guildRoles.find(x => x.label === role.name);

if(!findRole)return interaction.reply({ embeds: [errEmbed.setDescription(`**That Role Is Not In The Button Roles List**`)], ephemeral: true })

const filteredRoles = guildRoles.filter(x => x.label !== role.name) 

guildData.roles = filteredRoles;

await guildData.save()

interaction.reply({embeds: [errEmbed.setDescription(`**Removed Button Role: ${role} | Do /roles panel To See The Button Roles Panel**`)]})
                                        
}
  
}
if (SUB_COMMAND === "panel") {
const type = interaction.options.getString("type")
  
if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))return interaction.reply({ embeds: [errEmbed.setDescription(`**You Do Not Have The MANAGE_SERVER Permission**`)], ephemeral: true })

if(type === "drop"){
const guildData = await drModel.findOne({
guildId: interaction.guildId
})
  
if(!guildData.roles)return interaction.reply({ content:"There Is No Dropdown Roles Inside Of This Server!", ephemeral: true });

const options = guildData.roles.map(x => {
const role = interaction.guild.roles.cache.get(x.roleId); 
return{
label: role.name,
value: role.id,
description: x.desc || 'No Description',
emoji: x.emoji
};
});
const panelEmbed = new MessageEmbed()
.setTitle('**Please Select A Role Below**')
.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
.setColor("#6495ED")
const components = [
new MessageActionRow().addComponents(
new MessageSelectMenu()
.setCustomId('reaction-roles')
.addOptions(options)
)
];
interaction.reply(' sent ')
interaction.channel.send({ embeds: [panelEmbed], components });
}

if(type === "button"){
const guildData = await brModel.findOne({
guild: interaction.guildId
})

if(!guildData?.roles)return interaction.reply({ content:"There Are No Button Roles Inside Of This Server!", ephemeral: true });
  
const buttons = [];
const rows = [];
  
for (let i = 0; i < guildData.roles.length; i++) {
const role = interaction.guild.roles.cache.find(r => r.name === guildData.roles[i].label); 
  
let obj  = {
label: role.name,
emoji: guildData.roles[i].emoji,
style: guildData.roles[i].style,
custom_id: guildData.roles[i].customId,
disabled: false,
type: 2,
}
buttons.push(obj)
}

for (let i = 0; i < Math.ceil(guildData.roles.length / 5); i++) {
rows.push(new MessageActionRow());
}
  
rows.forEach((row, i) => {
row.addComponents(buttons.slice(0 + (i * 5), 5 + (i * 5)));
});
  
const panelEmbed = new MessageEmbed()
.setTitle('**Please Click On A Button Below**')
.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
.setColor("#6495ED")

interaction.reply(' sent ')
interaction.channel.send({ embeds: [panelEmbed], components: rows });
}
  
}
},
};
