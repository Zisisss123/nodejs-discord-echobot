const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.author == client.user) {
    return;
  } else if (msg.content === 'ping') {
    msg.reply('Pong!');
  } else {
    msg.reply(msg.content);
  }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
  
  addedRoles.forEach(role => {
    const addedBy = newMember.guild.members.cache.get(newMember.guild.me.id);
    const givenTo = newMember;
    const roleName = role.name;

    console.log(`1: ${givenTo} was given the role`);
    console.log(`2: ${addedBy} added the role to ${givenTo}`);
    console.log(`3: ${roleName}`);
  });
});

client.login(process.env.TOKEN);
