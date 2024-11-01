const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
    name: "sdxl",
    version: "2.2",
   role: 0,
    author: "Odiamus",//original version Zetsu
    description: {
en:  "Image sdxl alimentée par Sandip API " 
},
    category: "ai-generate",
    usages: "[prompt] -r [ratio] -m [model]",
    guide: "{p}sdxl [prompt] -r [ratio] -m model [model]"
};

module.exports.onStart = async function({ api, event, args }) {
    let prompt;

    if (args.includes("-r")) {
        prompt = args.slice(0, args.indexOf("-r")).join(" ");
    } else if (args.includes("-m")) {
        prompt = args.slice(0, args.indexOf("-m")).join(" ");
    } else {
        prompt = args.join(" ");
    }

    if (!prompt) {
        const guideMessage = "Ex:\n{prefix} sdxl une fille très sexy au bord de la mer -m 2 -r 1:1 -st 8 --ar 5:12";
        return api.sendMessage(guideMessage, event.threadID, event.messageID);
    }

if (prompt.toLowerCase() === "ratio") {
        const usim = "All Xx Model ";
        return api.sendMessage(usim, event.threadID, event.messageID);
      }

if (prompt.toLowerCase() === "model") {

            const modelList = "All Model XL ";

            return api.sendMessage(modelList, event.threadID, event.messageID);

        }
    let modelIndex = 1; // Default model index
    if (args.includes("-m")) {
        const modelArgIndex = args.indexOf("-m") + 1;
        modelIndex = parseInt(args[modelArgIndex], 10);
        args.splice(args.indexOf("-m"), 2);
    }

    let ratio = "1:1"; // Default ratio
    if (args.includes("-r")) {
        const ratioArgIndex = args.indexOf("-r") + 1;
        ratio = args[ratioArgIndex];
        args.splice(args.indexOf("-r"), 2);
    }

    const apiUrl = `https://sandipbaruwal.onrender.com/nsfwgen?prompt=${encodeURIComponent(prompt)}`;

    api.sendMessage('🍜 | Attend, je finisse de manger....⏰', event.threadID, event.messageID);

    try {
        const response = await axios.get(apiUrl, { responseType: "stream" });
        const cacheFolderPath = path.join(__dirname, "cache");

        if (!fs.existsSync(cacheFolderPath)) {
            fs.mkdirSync(cacheFolderPath);
        }

        const imagePath = path.join(cacheFolderPath, `generated.png`);
        const writer = fs.createWriteStream(imagePath);
        response.data.pipe(writer);

        writer.on("finish", () => {
            const stream = fs.createReadStream(imagePath);
            api.sendMessage({ body: "🌟| Ici votre gen Model 🖼️", attachment: stream }, event.threadID, event.messageID);
        });

        writer.on("error", (err) => {
            console.error("Stream error:", err);
            api.sendMessage("❌ | Failed to generate image.", event.threadID, event.messageID);
        });
    } catch (error) {
        console.error("Error:", error);
        api.sendMessage("❌ | Failed to generate image.", event.threadID, event.messageID);
    }
};