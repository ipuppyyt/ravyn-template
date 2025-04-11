const { configureHotReload } = require("./modules/hot-reload.cjs");
const { setApplicationMenu } = require("./menu.cjs");
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "modules/preload.cjs"),
    },
  });

  // Handle external links to open in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("file:")) {
      return { action: "allow" };
    }
    // Open external http/https links in default browser
    if (url.startsWith("http:") || url.startsWith("https:")) {
      require("electron").shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });

  // Load the app
  const startUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8181`
      : url.format({
          pathname: path.join(__dirname, "../renderer/index.html"),
          protocol: "file:",
          slashes: true,
        });

  mainWindow.loadURL(startUrl);

  // Open DevTools in development mode
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.on("before-input-event", (event, input) => {
      if (input.key === "F12") {
        mainWindow.webContents.toggleDevTools();
        event.preventDefault();
      }
    });
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === "development") {
    configureHotReload(mainWindow);
  }
}

app.whenReady().then(() => {
  createWindow();
  setApplicationMenu();
});


app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});


app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
