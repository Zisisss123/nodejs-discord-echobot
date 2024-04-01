const Discord = require('discord.js'); // Import the Discord.js module
const keep_alive = require('./keep_alive.js'); // Keep the bot alive (if needed)

const client = new Discord.Client(); // Create a new Discord client instance

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`); // Log that the bot is ready
});

client.on('message', msg => {
  // Check if the message isn't from the bot itself
  if (msg.author === client.user) {
    return;
  } else if (msg.content.toLowerCase() === 'ping') {
    // Respond with "Pong!" if the message is "ping"
    msg.reply('Pong!');
  } else {
    // Echo the message content back if it's not "ping"
    msg.reply(msg.content);
  }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
  addedRoles.forEach(role => {
    // Send a message to the same channel
    newMember.guild.channels.cache.forEach(channel => {
      if (channel.type === 'text') {
        channel.send(`1: ${newMember} got the role\n2: ${newMember.guild.members.cache.get(newMember.guild.me.id)} added the role to ${newMember}\n3: ${role}`);
      }
    });
  });
});

// Log in to Discord with the bot's token
client.login(process.env.TOKEN);
