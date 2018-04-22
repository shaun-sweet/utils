const axios = require("axios");
const fs = require("fs");

const { CONFIG_KEY, CONFIG_CONTEXT } = process.env;
const CONFIG_API_URL =
  process.argv[2] || "https://config.shaunsweet.com/rest/rawFile";
const CONFIG_SAVE_TARGET = "config.js";

if (!CONFIG_KEY)
  throw new Error(
    "Missing Environment variable: $CONFIG_KEY exported in bash profile"
  );
if (!CONFIG_CONTEXT)
  throw new Error(
    "Missing Environment variable: $CONFIG_CONTEXT exported in bash profile"
  );

const client = axios.create({
  headers: {
    "Client-Token": CONFIG_KEY,
    Context: CONFIG_CONTEXT,
    File: "config.js",
    "Application-name": "ts-sr"
  }
});

client.get(CONFIG_API_URL).then(res => {
  fs.writeFile(CONFIG_SAVE_TARGET, res.data, err => {
    if (err) throw err;
    console.log(
      `"${CONFIG_CONTEXT}" config details written to file in the project root -> ${CONFIG_SAVE_TARGET}`
    );
  });
});
