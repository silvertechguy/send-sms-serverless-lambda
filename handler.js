"use strict";

const Nexmo = require("nexmo");
const nexmo = new Nexmo(
  {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  },
  { debug: true }
);

const sendMessage = (msg) => {
  return new Promise((res, rej) => {
    nexmo.message.sendSms(
      "Woofer",
      "201065093575",
      msg,
      {
        type: "unicode",
      },
      (err, data) => {
        if (err) return rej(err);
        return res(data);
      }
    );
  });
};

module.exports.message = async (event) => {
  const requestBody = JSON.parse(event.body);
  const message = requestBody.message;

  try {
    const messageSent = await sendMessage(message);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: { messageSent } }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
