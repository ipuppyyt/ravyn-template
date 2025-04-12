import { app } from "electron";
import { setApplicationMenu } from "../menu.js";
import { mainWindow, createWindow } from "./index.js";

app.whenReady().then(() => {
  createWindow();
  setApplicationMenu();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null || mainWindow.isDestroyed()) createWindow();
});
