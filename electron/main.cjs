const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Filter console messages
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.log = (...args) => {
  originalConsoleLog(...args);
};

console.warn = (...args) => {
  // Filter out specific warnings here if needed
  originalConsoleWarn(...args);
};

console.error = (...args) => {
  originalConsoleError(...args);
};

// Keep a global reference of the window object to avoid garbage collection
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Handle external links to open in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Allow file protocol for local navigation
    if (url.startsWith('file:')) {
      return { action: 'allow' };
    }
    // Open external http/https links in default browser
    if (url.startsWith('http:') || url.startsWith('https:')) {
      require('electron').shell.openExternal(url);
      return { action: 'deny' };
    }
    // Default allow other cases
    return { action: 'allow' };
  });

  // Load the app
  const startUrl = process.env.NODE_ENV === 'development' 
    ? `http://localhost:8181`
    : url.format({
        pathname: path.join(__dirname, '../dist/index.html'),
        protocol: 'file:',
        slashes: true
      });
  
  mainWindow.loadURL(startUrl);

  // Open DevTools in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Handle window close event
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Create window when Electron is ready
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// On macOS, recreate window when dock icon is clicked and no windows are open
app.on('activate', function () {
  if (mainWindow === null) createWindow();
});