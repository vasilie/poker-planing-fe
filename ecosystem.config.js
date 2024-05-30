module.exports = {
  apps: [
    {
      name: "Poker planning be",
      exec_mode: "cluster",
      instances: "1",
      script: "./app.js", // your script
      args: "start",
      env: {
        NODE_ENV: "production", 
      },
    },
  ],
};