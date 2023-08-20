const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");

async function connectToMongoDB() {
  const uri = `${process.env.MongoDB}`;
  try {
    await mongoose.connect(uri, {
      dbName: `${process.env.MongoDBName}`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = {
  name: "ready",
  once: true,
  async execute(bot) {
    await connectToMongoDB();
    console.log(`${bot.user.tag} online`);
    bot.user.setPresence({
      activities: [{ name: `over the chaos`, type: ActivityType.Watching }],
      status: "online",
    });
  },
};
