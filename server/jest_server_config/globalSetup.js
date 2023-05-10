const { setup: setupDevServer } = require("jest-dev-server");

module.exports = async function globalSetup() {
  globalThis.servers = await setupDevServer({
    command: `nodemon ../index.js`,
    port: 5000,
  });

  console.log("Invoking server.");
};