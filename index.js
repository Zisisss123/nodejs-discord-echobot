
const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js');

const client = new Discord.Client();

client.on('message', async message => {
  // Check if the message was sent by a user and includes "sold"
  if (message.author.bot) return; // Ignore messages from bots
  if (message.content.toLowerCase().includes('sold')) {
    // Create an embed message with buttons attached
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Items Sold')
      .setDescription('Choose one of the following options:')
      .addFields(
        { name: '1', value: 'hahaha' },
        { name: '2', value: 'suauac' }
      );
    
    // Send the message with buttons attached
    const sentMessage = await message.channel.send({ embeds: [embed], components: [
      new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('option_1')
            .setLabel('1')
            .setStyle('PRIMARY'),
          new Discord.MessageButton()
            .setCustomId('option_2')
            .setLabel('2')
            .setStyle('PRIMARY')
        )
    ]});
    
    // Add button click event listener
    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = sentMessage.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async interaction => {
      if (interaction.customId === 'option_1') {
        await interaction.reply({ content: 'You chose hahaha', ephemeral: true });
      } else if (interaction.customId === 'option_2') {
        await interaction.reply({ content: 'You chose suauac', ephemeral: true });
      }
    });
    
    collector.on('end', collected => {
      console.log(`Collected ${collected.size} interactions.`);
    });
  }
});

client.login(process.env.TOKEN); // Log in with the bot's token
