const fs = require("fs-extra");
module.exports  = {
	config: {
		name: "restart",
		version: "2.4",
		author: "NTKhang | Odiamus",
		countDown: 5,
		role: 2,
		description: {
			en: "Restart bot"
		},
		category: "Owner",
		guide: {
			en: "   {pn}: Restart bot"
		}
	},

	langs: {
		en: {
			restartting: "(⁠◍⁠•⁠ᴗ⁠•⁠◍⁠) | Redémarrage du système ..."
		}
	},

	onLoad: function ({ api }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		if (fs.existsSync(pathFile)) {
			const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
			api.sendMessage(`✅ | Redémarrage du système effectué avec succès\n⏰ | Temps: ${(Date.now() - time) / 1000}s\nNew Odiamus link start 🌟`, tid);
			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({ message, event, getLang }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
		await message.reply(getLang("restartting"));
		process.exit(2);
	}
};
