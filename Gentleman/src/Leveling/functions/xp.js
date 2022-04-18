const xpSchema = require("./../models/leveling")
const config = require("./../models/config")
const { Permissions } = require("discord.js")

async function xp(message) {
if(!message.guild)return;
if(message.author.bot)return;
let server;
server = await config.findOne({
guild: message.guild.id,
})

if(!server?.leveling === true)return
  
const randomNumber = Math.floor(Math.random() * 10) + 15;

let leveling;
leveling = await xpSchema.findOne({
guId: `${message.guild.id}xp${message.author.id}`
})
if(leveling){
leveling = await xpSchema.findOneAndUpdate({
guId: `${message.guild.id}xp${message.author.id}` }, {
$inc: {
xp: randomNumber
}
})
}
if(!leveling) {
return leveling = await xpSchema.create({
guId: `${message.guild.id}xp${message.author.id}`,
user: message.author.id,
level: 1,
xp: randomNumber,
});
}   
var level = leveling.level;
var xp = leveling.xp;
var xpNeeded = level * 500;
if(xpNeeded < xp){

leveling = await xpSchema.findOneAndUpdate({
guId: `${message.guild.id}xp${message.author.id}` }, {
$inc: {
level: 1,
xp: -xpNeeded
}
})

let find = server.roles?.find((obj => obj.lvl == leveling.level + 1))
  
if(find) {
var role = message.member.guild.roles.cache.get(find.role);
message.member.roles.add(role, `Level Up`).catch(err => {})

message.channel.send(`🎉 | Congrats ${message.author}, You Leveled Up, You Are Now Level ${leveling.level + 1} And You Got The Role ${role.name}`)
}else{
  
message.channel.send(`🎉 | Congrats ${message.author}, You Leveled Up, You Are Now Level ${leveling.level + 1}`)
}
}
}
module.exports = xp
