const axios = require('axios');
const fs = require('fs');
module.exports = {
  config: {
    name: "anime",
   aliase: ["anim"],
    version: "1.2",
    author: "Odiamus",//don't change name odiamus 
    countDown: 5,
    role: 0,
    shortDescription: {
      en: 'Generate Models powered by Sandip API .'
    },
    category: "ai-generate",
    guide: {
      en: "{p}mod <prompt>"
    },
  },
  onStart: async function({ message, args, api, event }) {
    try {
      const prompt = args.join(" ");
      if (!prompt) {
        return message.reply("Please provide a prompts 🥱.");
      }
      api.setMessageReaction("🕡", event.messageID, () => {}, true);
      const startTime = new Date().getTime();
      const apiUrl = `https://sandipbaruwal.onrender.com/nsfw`;
      const params = {
        prompt: prompt,
      };
      const response = await axios.get(apiUrl, {
        params: params,
        responseType: 'stream'
      });
      const endTime = new Date().getTime();
     const timeTaken = (endTime - startTime) / 1000;
      api.setMessageReaction("⏰", event.messageID, () => {}, true);
      const fileName = 'anime.png'; //
      const filePath = `/tmp/${fileName}`; // Example path, adjust as necessary
      const writerStream = fs.createWriteStream(filePath);
      response.data.pipe(writerStream);
      writerStream.on('finish', function() {
        message.reply({
          body: `🎀 Yoυr Geɴ Model\n━━━━━━━━━━━━━━\n\nHere is your generated image based on Sandip Api\n\n⚙ Prompt: ${prompt}\n👑 Time Taken: ${timeTaken} seconds`,
          attachment: fs.createReadStream(filePath)
        });
      });
    } catch (error) {
      console.error('Error generating image:', error);
      message.reply("❌ Failed to generate your Gen Model.");
    }
  }
};
