const { GoatWrapper } = require('fca-liane-utils');
const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "animex",
    aliases: [],
    author: "Vex_Kshitiz | odiamus",
    version: "1.3",
    cooldowns: 5,
    role: 0,
    shortDescription: "Generate anime image based on prompt.",
    longDescription: "Generates an anime image based on the provided prompt.",
    category: "ai-generate",
    guide: "{p}animex <prompt>",
  },
  onStart: async function ({ message, args, api, event }) {
     api.setMessageReaction("✨", event.messageID, (err) => {}, true);  
    try {
      const prompt = args.join(" ");
      const animexApiUrl = `https://imagegeneration-kshitiz-6846.onrender.com/animex?prompt=${encodeURIComponent(prompt)}`;

      const response = await axios.get(animexApiUrl, {
        responseType: "arraybuffer"
      });

      const cacheFolderPath = path.join(__dirname, "/cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }

      const imagePath = path.join(cacheFolderPath, `anime_image.png`);
      fs.writeFileSync(imagePath, response.data);

      message.reply({
        body: "🎀 𝗔𝗻𝗶𝗺𝗲𝗫\n━━━━━━━━━━━━━━\n\nHere is your generated image based on Animex style\n\n⚙ Prompt: ${prompt}\n👑 Time Taken: ${timeTaken} seconds",
        attachment: fs.createReadStream(imagePath) 
      });
    } catch (error) {
      console.error("Error:", error);
      message.reply("An error please retry later .");
    }
  }
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
