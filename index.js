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
          new Discord.MessageButton()
            .setCustomId('option1')
            .setLabel('Hdhshd')
            .setStyle('PRIMARY'),
          new Discord.MessageButton()
            .setCustomId('option2')
            .setLabel('ahdbuaon')
            .setStyle('PRIMARY')
        );

      const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Choose an option')
        .setDescription('Please select one of the options below:')
        .setFooter('Powered by ChatGPT');

      randomChannel.send({ content: 'I am the one', embeds: [embed], components: [options] });
    }
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'option1') {
    await interaction.reply({ content: 'You chose option 1.', ephemeral: true });
  } else if (interaction.customId === 'option2') {
    await interaction.reply({ content: 'You chose option 2.', ephemeral: true });
  }
});

client.login(process.env.TOKEN); // Log in with the bot's token
