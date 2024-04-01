const Discord = require('discord.js'); // Import Discord.js module
const keep_alive = require('./keep_alive.js'); // Keep the bot alive (if needed)

const client = new Discord.Client(); // Create a new Discord client instance

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  // Check if the message isn't from the bot itself
  if (msg.author == client.user) {
    return;
  } else if (msg.content === 'ping') {
    msg.reply('Pong!');
  } else {
    msg.reply(msg.content);
  }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  // Extract necessary information
  const updatedUser = newMember;
  const updaterUser = newMember.guild.members.cache.get(newMember.guild.me.id);
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

  // Get a random text channel from the guild
  const randomChannel = newMember.guild.channels.cache.filter(channel => channel.type === 'text').random();

  if (randomChannel) {
    randomChannel.send(
      `1: ${updatedUser}\n2: ${updaterUser}\n3: ${addedRoles.map(role => role.toString()).join(', ')}`
    );
  }
});

client.login(process.env.TOKEN); // Log in with the bot's token
