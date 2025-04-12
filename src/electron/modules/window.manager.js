let mainWindowInstance = null;

export function windowManager(mainWindow) {
  if (!mainWindow || !mainWindow.webContents) return;
  
  mainWindowInstance = mainWindow;
  
  mainWindow.on("closed", function () {
    mainWindowInstance = null;
    process.exit(1);
  });
}

export function getMainWindow() {
  return mainWindowInstance;
}