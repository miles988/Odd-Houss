const axios = require('axios');
const { GoatWrapper } = require('fca-liane-utils');

module.exports = {
  config: {
    name: "fx",
    aliases: ["x"],
    version: "1.0",
    author: "odiamus",
    countDown: 5,
    role: 0,
    shortDescription: {
en: "Flux image alimenté par l'API de Samir" 
},
    longDescription: "Une cmd de Odiamus",
    category: "ai-generate",
    guide: {
      en: "{pn} <prompt> --ar 1:1 --model 2"
    }
  },

  onStart: async function ({ message, args }) {
    const waitingMessages = [
      "🍀 | Préparation de votre image....",
     "🍝 | Attend je finisse de manger.....⏰",
     "⏰ | Un instant maître.....🥱",
      "✨ | L'étoile du soir arrive....🌟",
      "🎃 | Merry Halloween arrive...👻"//Ajoute ici les messages d'attente que tu veux 😁
    ];

    const randomWaitingMessage = waitingMessages[Math.floor(Math.random() * waitingMessages.length)];
    await message.reply(randomWaitingMessage);

    let prompt = args.join(" ");
    let aspectRatio = "1:1";
    let model = "2";

    for (let i = 0; i < args.length; i++) {
      if (args[i] === "--ar" && args[i + 1]) {
        aspectRatio = args[i + 1];
      }
      if (args[i] === "--model" && args[i + 1]) {
        model = args[i + 1];
      }
    }

    try {
      const apiUrl = `https://otinxsandip.vercel.app/test?prompt=cat&model=19=${encodeURIComponent(prompt)}&ratio=${aspectRatio}&model=${model}`;
      const imageStream = await global.utils.getStreamFromURL(apiUrl);

      if (!imageStream) {
        return message.reply("😅 | Désolé l'image ne peut-être générée. Disons c'est trop compliqué .");
      }

      return message.reply({
        body: '✨ Ta-da! Votre flux demande est prête ! 🖼️',
        attachment: imageStream
      });
    } catch (error) {
      console.error(error);
      return message.reply(" Eh merde ! Une erreur est survenue lors de la demande .");
    }
  }
};

const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });
