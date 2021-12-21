const { schedule } = require("@netlify/functions");
const Axios = require("axios").default;
const { minutesUntilHawaii } = require("./counter/counter");

exports.handler = schedule("* * * * *", async () => {
  await Axios.post(
    "https://slack.com/api/chat.postMessage",
    {
      channel: "hawaiidiff-test",
      text: `${minutesUntilHawaii} minutes until Hawaii 🌺`,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
    }
  );

  return {
    statusCode: 200,
  };
});
