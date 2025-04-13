import { BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
    titleBarStyle: "hidden",
    trafficLightPosition: {
      x: 10,
      y: 10,
    },
    icon: path.join(__dirname, "../assets/icon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  return mainWindow;
}

export { createMainWindow };