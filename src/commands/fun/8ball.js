const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("What does the 8ball say?...")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("What would you like to ask the magic 8ball?")
        .setRequired(true)
    ),
  async execute(interaction, bot) {
    const options = [
      "My answer would be a no",
      "Mayhaps",
      "It is certain",
      "It is decidely so",
      "Without a doubt",
      "Definately",
      "Most likely",
      "Signs point to yes",
      "It would be better for me to not say it",
      "Ask again later",
      "No",
      "Depends on the mood of the gods",
      "Hang in there bud",
      "This is just the beginning, its going to get a whole lot worse",
      "This is just the beginning, its going to get a whole lot better",
      "Good luck",
      "Oh... um, good luck?",
      "If you want your life to be a little more adventurous you absolutely should, because remember the 8ball turned two strangers into famous entrepreneurs",
      "Listen I am just going to say this in a affirmative but in a non-committal way. ...yeah, sure...",
      "Listen I am just going to say this in a negative but in a non-committal way. ...no, probably not...",
      "Listen asking random questions to a digital magic 8ball doesn't count as a personality trait",
      "My sources say no, but they also said that the queen was immortal",
      "My sources say yes, but they also said that the queen was immortal",
      "You wish",
      "All I am going to say is that you will probably die, and don't take this as a threat",
      "All I am going to say is that you will probably die, and do take this as a threat",
      "Honestly are those the questions that you should be asking a digital 8ball?",
      "I am not saying no... but all I am saying is that I probably wouldn't",
      "I am not saying yes... but all I am saying is that I probably would",
      "I am not saying no... but all I am saying is that I probably would",
      "I am not saying yes... but all I am saying is that I probably wouldn't",
      "Trust me, you don't want to know",
      "Trust me, you REALLY don't want to know",
      "Don't know, Don't care",
      "Listen I am a digital 8ball, you think I'd know?",
      "Yes this is a simulation, wake up",
      "You really just gonna collect these L's huh",
      "Damn bro, here just take this L and leave",
      "Sir, this is Wendy's",
      "No comment",
      "Just like the simulations!",
      "Oh god, this isn't like the simulations at all!",
      "S H U T",
      "I forgor",
      "Damn, I ain't saying that's fucked up, but... that's fucked up",
      "I am going to say this as nicely as I can, no",
      "Please no...",
      "Please don't",
      "Just don't",
      "How about Nooooooo",
      "Only a Maidenless fool would ask such a question",
      "Roger Roger",
      "42?",
      "Now you just hold on a minute",
      "Nani the fuck?",
      "Uh...huh...",
      "yeah sure, go for it...",
      "I will send you the Jesus",
      "EMOTIONAL DAMAGE",
      "Soon™",
      "This is the part where you die (This is the part where you die)",
      "Cope",
      "Cope?",
      "Oh shure bud",
      "My sources say yes, but my source is a random article from twitter",
      "My sources say yes, but my source is a random article from twitter",
      "My sources say no, but my source is a random article from reddit",
      "My sources say no, but my source is a random article from reddit",
      "Sorry who are you again?",
      "Cope + Seeth + Mald",
      "Outlook as clear as mud.",
      "Ask your pet turtle for advice.",
      "Shake me again in a parallel universe.",
      "Only if you promise to do the chicken dance.",
      "Reply hazy, try again after a nap.",
      "You might as well ask a potato.",
      "If life were a cartoon, yes!",
      "I'll tell you, but first, tell me your favorite knock-knock joke.",
      "As likely as finding a unicorn in your bathtub.",
      "Ask the person in the mirror for guidance.",
      "Sure, if you can prove that dolphins can fly.",
      "I'd tell you, but then I'd have to charge your phone.",
      "Go for it, but beware of wandering kangaroos.",
      "My answer is... Do the hokey pokey and turn yourself around.",
      "Can't predict now, I'm binge-watching cat videos.",
      "If it involves chocolate, then yes.",
      "Not even the squirrels know the answer to that one.",
      "Let's roll a D20 and see.",
      "Ask again after you've counted all the grains of sand at the beach.",
      "Reply hazy, ask Alexa.",
      "You'll get your answer as soon as pigs fly... oh wait, they do!",
      "Outlook is about as promising as a banana peel.",
      "If you can juggle flaming torches, then yes.",
      "Do you really want me to predict that? Seriously?",
      "Sure thing, just consult a fortune cookie too.",
      "All signs point to 'I don't know, maybe?'",
      "Yes, but only if you can do the moonwalk on water.",
      "Consult a magic mirror for a second opinion.",
      "The odds are as good as finding a needle in a haystack made of needles.",
      "The stars say 'meh.'",
      "Sure, but only if you promise to dance the Macarena afterward.",
      "My circuits say yes, but my motherboard disagrees.",
      "As certain as a cat ignoring you.",
      "If you do a rain dance first, then yes.",
      "I'm leaning towards 'absolutely... not.'",
      "The answer is floating in a sea of ambiguity.",
      "Give it a shot, but keep a spare umbrella handy.",
      "Yes, but only during a solar eclipse.",
      "The eight ball is in a coffee break, try again later.",
      "Prospects are as dim as a black hole's mood.",
      "My data says 'ask again when pigs fly.'",
      "Signs point to 'ask a toddler for advice.'",
      "The answer's in the cloud, but it's pretty foggy up there.",
      "Ask again after you've counted all the stars in the universe.",
      "Absolutely maybe.",
      "Outlook is hazier than a foggy day in a steam room.",
      "You'll get your answer right after you find Atlantis.",
      "Sure thing, just find a leprechaun for confirmation.",
      "Ask the moon, it's got a better view.",
      "Sorry, I'm on a coffee break – try again when I'm caffeinated.",
    ];

    const question = interaction.options.getString("question");
    const answer = Math.floor(Math.random() * options.length);
    //${options[answer]}
    const embed = new EmbedBuilder()
      .setTitle("You asked:")
      .setDescription(`${question}`)
      .addFields([
        {
          name: `Magic 8ball says:`,
          value: `${options[answer]}`,
          inline: true,
        },
      ])
      .setColor("Random")
      .setTimestamp(Date.now())
      .setFooter({
        iconURL: `${interaction.user.displayAvatarURL()}`,
        text: `Asked by ${interaction.user.tag}`,
      });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
