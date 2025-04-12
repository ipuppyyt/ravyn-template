const { devToolsHandler } = require("./dev-handler.cjs");
const { configureHotReload } = require("./hot-reload.cjs");
const { urlHandler } = require("./url-handler.cjs");
const { windowLoader } = require("./window.loader.cjs");
const { windowManager } = require("./window.manager.cjs");
const { createWindow, mainWindow } = require("./window.creator.cjs");
const { createMainWindow } = require("../window.cjs");

module.exports = {
  configureHotReload,
  urlHandler,
  windowLoader,
  devToolsHandler,
  windowManager,
  createMainWindow,
  createWindow,
  mainWindow,
};
