const axios = require('axios');
const ODIAMUS = [
"odiamus",
".Odiamus",
"Odiamus",
"Lonon",
"lonon",
"Odilon",
"odilon",
];
module.exports = {
config: {
name: "Odiamus",
version: 2.3,
author: "Odiamus X Sandip",//don't change name odiamus
role: 0,
countDown: 1,
longDescription : {
en: "Une IA alimentée par l'API Mistral de Sandip Baruwal" 
},
shortDescription: "En l'honneur de Baruwal",
guide: "odiamus [votre préoccupation]",
category: "ai",
},
     onStart: async function () {},
onChat: async function ({ api, event, args, message }) {
    try {

      const prefix = ODIAMUS.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return;
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("Salut ! Je suis Odiamus Assistant. Que puis-je pour toi ?");
        return;
      }


      const response = await axios.get(`https://sandipbaruwal.onrender.com/mistral?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;


    await message.reply({ body:`Oᴅɪᴀᴍᴜs Assɪsᴛᴀɴᴛ✨\n━━━━━━━━━━━━━━━━\n${answer}\n━━━━━━━━━━━━━━━━`,
});

   } catch (error) {
      console.error("Error:", error.message);
    }
  }
};