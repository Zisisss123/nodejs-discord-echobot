const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

  if (addedRoles.size > 0) {
    const guild = newMember.guild;
    const randomChannel = guild.channels.cache.filter(channel => channel.type === 'text').random();
    
    if (randomChannel) {
      randomChannel.send('hiii');
    }
  }
});

client.on('message', message => {
  if (message.content.toLowerCase().includes('patatopita') && message.member.hasPermission('ADMINISTRATOR')) { // Check if the user has administrator permission
    message.channel.send('hiii');
  }
});

client.login(process.env.TOKEN); // Log in with the bot's token
