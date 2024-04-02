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
});
    
bot = commands.Bot(command_prefix='/')

# Dictionary to store user data
user_data = {}

# Command: /louri
@bot.command()
async def louri(ctx):
    options = [
        discord.SelectOption(label="On Duty", value="on_duty"),
        discord.SelectOption(label="Off Duty", value="off_duty"),
        discord.SelectOption(label="Hours", value="hours"),
        discord.SelectOption(label="Admin", value="admin")
    ]

    select = discord.ui.Select(placeholder="Choose an option...", options=options)

    await ctx.send("I am the one", view=discord.ui.View(select))

# Interaction event handler
@bot.event
async def on_interaction(interaction):
    if isinstance(interaction, discord.Interaction) and interaction.message.content == 'I am the one':
        user_id = str(interaction.user.id)
        if interaction.data['values'][0] == 'on_duty':
            user_data[user_id] = {'on_duty': True, 'start_time': datetime.now()}
            await interaction.response.send_message("You are now on duty.")
        elif interaction.data['values'][0] == 'off_duty':
            if user_id in user_data:
                start_time = user_data[user_id]['start_time']
                end_time = datetime.now()
                delta = end_time - start_time
                total_minutes = delta.total_seconds() / 60
                if 'total_minutes' in user_data[user_id]:
                    user_data[user_id]['total_minutes'] += total_minutes
                else:
                    user_data[user_id]['total_minutes'] = total_minutes
                user_data[user_id]['on_duty'] = False
                await interaction.response.send_message(f"You were on duty for {total_minutes:.2f} minutes.")
        elif interaction.data['values'][0] == 'hours':
            total_hours = sum(user.get('total_minutes', 0) / 60 for user in user_data.values())
            await interaction.response.send_message(f"You have been on duty for {total_hours:.2f} hours overall.")
        elif interaction.data['values'][0] == 'admin':
            admin_message = "Total hours:\n"
            for user_id, data in user_data.items():
                username = bot.get_user(int(user_id)).name
                total_hours = data.get('total_minutes', 0) / 60
                admin_message += f"{username}: {total_hours:.2f} hours\n"
            await interaction.response.send_message(admin_message)
   }
  }
});

client.login(process.env.TOKEN); // Log in with the bot's token
