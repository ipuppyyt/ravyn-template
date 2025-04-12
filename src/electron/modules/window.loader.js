import url from "url";
import path from "path";

function windowLoader(mainWindow) {
  const startUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8181`
      : url.format({
          pathname: path.join(__dirname, "../renderer/index.html"),
          protocol: "file:",
          slashes: true,
        });

  mainWindow.loadURL(startUrl);
}

export { windowLoader };