const { urlHandler } = require("./url-handler.cjs");
const { windowLoader } = require("./window.loader.cjs");
const { devToolsHandler } = require("./dev-handler.cjs");
const { windowManager, getMainWindow } = require("./window.manager.cjs");
const { configureHotReload } = require("./hot-reload.cjs");
const { createMainWindow } = require("../window.cjs");

let mainWindow = null;

function createWindow() {
  const existingWindow = getMainWindow();
  if (existingWindow) {
    if (existingWindow.isMinimized()) existingWindow.restore();
    existingWindow.focus();
    return;
  }

  mainWindow = createMainWindow();

  urlHandler(mainWindow);
  windowLoader(mainWindow);
  devToolsHandler(mainWindow);
  windowManager(mainWindow);

  if (process.env.NODE_ENV === "development") {
    configureHotReload(mainWindow);
  }
}

module.exports = { mainWindow, createWindow };
