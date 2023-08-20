const { loadData, saveData } = require("../bot/db");
const votes = loadData("attendance");

function adjustVotes(embed, prevVoteData, newVote, username) {
  const getFieldByName = (name) =>
    embed.fields.find(
      (field) => field.name.toLowerCase() === name.toLowerCase()
    );

  if (prevVoteData) {
    const prevField = getFieldByName(prevVoteData.vote);
    const usernames = prevField.value.split(", ").filter((u) => u !== username);
    prevField.value = usernames.join(", ");
    getFieldByName(
      `# of ${
        prevVoteData.vote.charAt(0).toUpperCase() + prevVoteData.vote.slice(1)
      }`
    ).value = usernames.length.toString();
  }

  const newField = getFieldByName(newVote);
  if (newField.value === "" || !newField.value) {
    newField.value = username;
  } else {
    newField.value += `\n${username}`;
  }
  getFieldByName(
    `# of ${newVote.charAt(0).toUpperCase() + newVote.slice(1)}`
  ).value = newField.value.split("\n").length.toString();
}

module.exports = {
  data: {
    name: "attendance",
    description: "handles attendance buttons",
  },

  async execute(interaction) {
    if (!interaction.isButton()) return;

    const arr = interaction.customId.split("-");
    if (arr[0] !== "attendance") return;

    const userVoteId = `${interaction.user.id}-${interaction.message.id}`;

    const votes = await loadData("attendance");
    const userVotedData = votes.get(userVoteId);

    const newVote = arr[1];
    const username = interaction.user.username;

    const embed = interaction.message.embeds[0];
    if (!embed) {
      return interaction.reply({
        content:
          "Something went wrong while executing this command, please inform Doc about it thank you!",
        ephemeral: true,
      });
    }

    if (userVotedData && userVotedData.vote === newVote) {
      return interaction.reply({
        content: `You already voted for ${newVote}`,
        ephemeral: true,
      });
    } else {
      adjustVotes(embed, userVotedData, newVote, username);
      saveData(
        {
          userId: interaction.user.id,
          messageId: interaction.message.id,
          vote: newVote,
          username: username,
        },
        "attendance"
      );
    }

    interaction.message.edit({ embeds: [embed] });
    interaction.reply({
      content: `You voted for ${newVote}`,
      ephemeral: true,
    });
  },
};
