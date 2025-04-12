const { BrowserWindow } = require("electron");
const path = require("path");
const {
  urlHandler,
  windowLoader,
  devToolsHandler,
  windowManager,
  configureHotReload,
} = require("./modules/index.cjs");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    closable: true,
    hasShadow: true,
    movable: true,
    roundedCorners: true,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    minimizable: true,
    icon: path.join(__dirname, "../assets/icon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "modules/preload.js"),
    },
  });

  urlHandler(mainWindow);
  windowLoader(mainWindow);
  devToolsHandler(mainWindow);
  windowManager(mainWindow);

  if (process.env.NODE_ENV === "development") {
    configureHotReload(mainWindow);
  }
}

module.exports = { mainWindow, createWindow };
