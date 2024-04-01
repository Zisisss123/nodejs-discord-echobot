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
  } else if (msg.content.toLowerCase() === 'shut') {
    // Respond with "up" if the message is "shut"
    msg.reply('up');
  } else {
    // Echo the message content back if it's not "ping" or "shut"
    msg.reply(msg.content);
  }
});

// Log in to Discord with the bot's token
client.login(process.env.TOKEN);
