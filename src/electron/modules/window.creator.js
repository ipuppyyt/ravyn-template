import { urlHandler } from "./url-handler.js";
import { windowLoader } from "./window.loader.js";
import { devToolsHandler } from "./dev-handler.js";
import { windowManager, getMainWindow } from "./window.manager.js";
import { configureHotReload } from "./hot-reload.js";
import { createMainWindow } from "../window.js";

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

export { mainWindow, createWindow };
