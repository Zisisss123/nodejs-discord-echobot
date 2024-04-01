const Discord = require('discord.js'); // Import Discord.js module
const keep_alive = require('./keep_alive.js'); // Keep the bot alive (if 

client.on('guildMemberUpdate', (oldMember, newMember) => {
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));

  if (addedRoles.size > 0) {
    const guild = newMember.guild;
    const randomChannel = guild.channels.cache.filter(channel => channel.type === 'text').random();
    
    if (randomChannel) {
      const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Role Added')
        .setDescription('cc');
      
      randomChannel.send(embed);
   }
  }
});

client.login(process.env.TOKEN); // Log in with the bot's token
