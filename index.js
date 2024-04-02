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
      const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Role Added')
        .setDescription('cc');
      
      randomChannel.send(embed);
    }
  }
});

client.on('message', message => {
  if (message.content.toLowerCase().includes('patatopita') && message.member.hasPermission('ADMINISTRATOR')) { // Check if the user has administrator permission
    const options = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageSelectMenu()
          .setCustomId('louri_select')
          .setPlaceholder('Choose an option...')
          .addOptions([
            {
              label: 'On Duty',
              value: 'on_duty'
            },
            {
              label: 'Off Duty',
              value: 'off_duty'
            },
            {
              label: 'Hours',
              value: 'hours'
            },
            {
              label: 'Admin',
              value: 'admin'
            }
          ])
      );

    message.channel.send({ content: 'I am the one', components: [options] });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === 'louri_select') {
    const user = interaction.user;

    if (interaction.values[0] === 'on_duty') {
      // Add logic for on duty
      await interaction.reply({ content: 'You are now on duty.', ephemeral: true });
    } else if (interaction.values[0] === 'off_duty') {
      // Add logic for off duty
      await interaction.reply({ content: 'You are now off duty.', ephemeral: true });
    } else if (interaction.values[0] === 'hours') {
      // Add logic for hours
      await interaction.reply({ content: 'This is where you would see your total hours.', ephemeral: true });
    } else if (interaction.values[0] === 'admin') {
      // Add logic for admin
      await interaction.reply({ content: 'This is where you would see the admin stats.', ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN); // Log in with the bot's token
