const { shell } = require("electron");

function urlHandler(mainWindow) {
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("file:")) {
      return { action: "allow" };
    }

    if (url.startsWith("http:") || url.startsWith("https:")) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });
}

module.exports = { urlHandler };