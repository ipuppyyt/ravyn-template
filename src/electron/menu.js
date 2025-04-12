import { app, Menu, BrowserWindow, shell, dialog } from "electron";

/**
 * Create the application menu
 * @returns {Menu} The application menu
 */
function createMenu() {
  const isMac = process.platform === "darwin";

  // Template for the menu
  const template = [
    // App menu (macOS only)
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideOthers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
    // File menu
    {
      label: "File",
      submenu: [
        {
          label: "New",
          accelerator: "CmdOrCtrl+N",
          click: () => {
            // Handle new file action
            const win = BrowserWindow.getFocusedWindow();
            if (win) win.webContents.send("menu-new-file");
          },
        },
        {
          label: "Open",
          accelerator: "CmdOrCtrl+O",
          click: () => {
            // Handle open file action
            dialog
              .showOpenDialog({
                properties: ["openFile"],
                filters: [{ name: "All Files", extensions: ["*"] }],
              })
              .then((result) => {
                if (!result.canceled && result.filePaths.length > 0) {
                  const win = BrowserWindow.getFocusedWindow();
                  if (win)
                    win.webContents.send("menu-open-file", result.filePaths[0]);
                }
              })
              .catch((err) => {
                console.error("Error opening file:", err);
              });
          },
        },
        {
          label: "Save",
          accelerator: "CmdOrCtrl+S",
          click: () => {
            // Handle save file action
            const win = BrowserWindow.getFocusedWindow();
            if (win) win.webContents.send("menu-save-file");
          },
        },
        {
          label: "Save As",
          accelerator: "CmdOrCtrl+Shift+S",
          click: () => {
            // Handle save as action
            const win = BrowserWindow.getFocusedWindow();
            if (win) win.webContents.send("menu-save-as-file");
          },
        },
        { type: "separator" },
        isMac ? { role: "close" } : { role: "quit" },
      ],
    },
    // Edit menu
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
              { type: "separator" },
              {
                label: "Speech",
                submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
              },
            ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
      ],
    },
    // View menu
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    // Window menu
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isMac
          ? [
              { type: "separator" },
              { role: "front" },
              { type: "separator" },
              { role: "window" },
            ]
          : [{ role: "close" }]),
      ],
    },
    // Help menu
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            await shell.openExternal(
              "https://github.com/ipuppyyt/electron-react-vite-template"
            );
          },
        },
        {
          label: "About",
          click: () => {
            dialog.showMessageBox({
              title: "About",
              message: `${app.name} ${app.getVersion()}`,
              detail: "An Electron application with React and Vite",
              buttons: ["OK"],
            });
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  return menu;
}

/**
 * Set the application menu
 */
function setApplicationMenu() {
  const menu = createMenu();
  Menu.setApplicationMenu(menu);
}

export { createMenu, setApplicationMenu };
