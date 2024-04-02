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
      const options = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageSelectMenu()
            .setCustomId('louri_select')
            .setPlaceholder('Choose an option...')
            .addOptions([
              {
                label: 'ndndsj',
                value: 'option1'
              },
              {
                label: 'jdudjd',
                value: 'option2'
              }
            ])
        );

      randomChannel.send({ content: 'I am the one', components: [options] });
    }
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === 'louri_select') {
    const user = interaction.user;

    if (interaction.values[0] === 'option1') {
      // Add logic for option 1
      await interaction.reply({ content: 'You chose option 1.', ephemeral: true });
    } else if (interaction.values[0] === 'option2') {
      // Add logic for option 2
      await interaction.reply({ content: 'You chose option 2.', ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN); // Log in with the bot's token
