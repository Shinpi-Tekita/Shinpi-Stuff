const xp = require("../functions/xp");

const { MessageEmbed, MessageAttachment, Permissions, MessageActionRow, MessageButton } = require("discord.js");

const client = require("../index");

client.on("messageCreate", async (message) => {
xp(message)
});
