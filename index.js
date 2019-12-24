const SlackBot = require("slackbots");
require("dotenv").config();

const bot = new SlackBot({
  token: process.env.BOT_TOKEN,
  name: "a friend."
});

bot.on("message", message => {
  if (message.subtype !== "channel_join") {
    return;
  }

  console.log(message);
  if (message.user == "US2RDLTML") {
    let params = {
      icon_emoji: ":wave:"
    };

    bot.postMessage(
      message.channel,
      `Hi everyone, I'm a friendly bot built by <@UHFEGV147>! Just mention me in a message if you need anything :)`,
      params
    );
  }
});

bot.on("error", err => {
  console.log(err);
});

bot.on("message", message => {
  if (message.type !== "message") {
    return;
  }
  console.log(message);
  if (
    message.user !== "BS05VGWCU" &&
    message.subtype !== "bot_message" &&
    message.text.includes("<@US2RDLTML>")
  ) {
    handleMessage(message);
  }
});

function handleMessage(message) {
  let possibleSayings = {
    joke: {
      aliases: ["random joke"],
      func: channel => {
        const params = {
          icon_emoji: ":wave:"
        };
        bot.postMessage(channel, "hey", params);
      }
    },

    hello: {
      aliases: ["hey", "greetings", "hi", "'sup", "wassup"],
      func: (channel, message) => {
        let params = {
          icon_emoji: ":wave:"
        };

        bot.postMessage(channel, `Hey there, <@${message.user}>!`, params);
      }
    },
    gp: {
      aliases: ["gp"],
      func: (channel, message) => {
        let params = {
          icon_emoji: ":moneybag:",
          username: "a philosophical friend."
        };

        let text = `<@${message.user}>, I don't deal with material-valued things, like currency.`;
        bot.postMessage(channel, text, params);
      }
    },
    "are you": {
      func: (channel, message) => {
        var params = {
          icon_emoji: ":blush:",
          username: "a true friend."
        };
        if (message.text.includes("my friend")) {
          let text = `<@${message.user}>, I really am your friend. Now, and always.`;
          bot.postMessage(channel, text, params);
        }
      }
    },
    like: {
      func: (channel, message) => {
        var params = {
          icon_emoji: ":blush:",
          username: "a true friend."
        };
        if (message.text.includes("doesn't") && message.text.includes("me")) {
          let text = `<@${message.user}>, I really _do_ like you!`;
          bot.postMessage(channel, text, params);
        }
      }
    }
  };

  let nameOfSaying = "";

  let checkSaying = Object.keys(possibleSayings).some((saying, index) => {
    let prototypeCheck = false;
    let messageTextToCheck = message.text.toLowerCase();
    let messageIncludes = messageTextToCheck.includes(saying);
    if (messageIncludes) {
      nameOfSaying = saying;
    }
    prototypeCheck = messageIncludes;

    if (!messageIncludes && saying.aliases) {
      let protAliasCheck = possibleSayings[saying].aliases.some(alias => {
        aliasCheck = messageTextToCheck.includes(alias);
        if (aliasCheck) {
          nameOfSaying = saying;
        }
        return aliasCheck;
      });
      prototypeCheck = protAliasCheck;
    }

    return prototypeCheck;
  });

  if (checkSaying) {
    possibleSayings[nameOfSaying].func(message.channel, message);
  } else {
    console.log("no");
    let params = {
      icon_emoji: ":confused-dino:",
      username: "a confused friend."
    };

    let text = `<@${message.user}>, I don't understand.`;
    bot.postMessage(message.channel, text, params);
  }
}
