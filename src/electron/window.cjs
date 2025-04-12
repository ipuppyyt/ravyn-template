const { BrowserWindow } = require("electron");
const path = require("path");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
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
      preload: path.join(__dirname, "preload.js"),
    },
  });

  return mainWindow;
}

module.exports = { createMainWindow };