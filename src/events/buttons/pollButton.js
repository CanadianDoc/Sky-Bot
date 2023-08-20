const { loadData, saveData } = require("../bot/db");
const votes = loadData("poll");

function adjustVotes(embed, prevVote, newVote) {
  const getFieldByName = (name) =>
    embed.fields.find(
      (field) => field.name.toLowerCase() === name.toLowerCase()
    );
  if (prevVote) {
    getFieldByName(prevVote).value = (
      parseInt(getFieldByName(prevVote).value) - 1
    ).toString();
  }
  getFieldByName(newVote).value = (
    parseInt(getFieldByName(newVote).value) + 1
  ).toString();
}

module.exports = {
  data: {
    name: "poll",
    description: "handles poll buttons",
  },

  async execute(interaction) {
    if (!interaction.isButton()) return;

    const arr = interaction.customId.split("-");
    if (arr[0] !== "poll") return;

    const userVoteId = `${interaction.user.id}-${interaction.message.id}`;

    const votes = await loadData("poll");
    const userVoted = votes.get(userVoteId);

    const newVote = arr[1];

    const embed = interaction.message.embeds[0];
    if (!embed) {
      return interaction.reply({
        content:
          "Something went wrong while executing this command, please inform Doc about it thank you!",
        ephemeral: true,
      });
    }

    if (userVoted === newVote) {
      return interaction.reply({
        content: `You already voted for ${newVote}`,
        ephemeral: true,
      });
    } else {
      adjustVotes(embed, userVoted, newVote);
      saveData(
        {
          userId: interaction.user.id,
          messageId: interaction.message.id,
          vote: newVote,
        },
        "poll"
      );
    }

    interaction.message.edit({ embeds: [embed] });
    interaction.reply({
      content: `You voted for ${newVote}`,
      ephemeral: true,
    });
  },
};
