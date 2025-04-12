let mainWindowInstance = null;

function windowManager(mainWindow) {
  if (!mainWindow || !mainWindow.webContents) return;
  
  mainWindowInstance = mainWindow;
  
  mainWindow.on("closed", function () {
    mainWindowInstance = null;
  });
}

function getMainWindow() {
  return mainWindowInstance;
}

module.exports = { windowManager, getMainWindow };