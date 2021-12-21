const { schedule } = require("@netlify/functions");
const Axios = require("axios").default;
const { timeUntilHawaii } = require("./counter/counter");

exports.handler = schedule("@daily", async () => {
  await Axios.post(
    "https://slack.com/api/chat.postMessage",
    {
      channel: "hawaiidiff-test",
      text: `${timeUntilHawaii} days until Hawaii 🌺`,
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
