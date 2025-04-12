const { app } = require("electron");
const { setApplicationMenu } = require("../menu.cjs");
const { mainWindow, createWindow } = require("../window.cjs");

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
