function devToolsHandler(mainWindow) {
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.on("before-input-event", (event, input) => {
      if (input.key === "F12") {
        mainWindow.webContents.toggleDevTools();
        event.preventDefault();
      }
    });
  }
}

module.exports = { devToolsHandler };