function windowManager(mainWindow) {
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

module.exports = { windowManager };