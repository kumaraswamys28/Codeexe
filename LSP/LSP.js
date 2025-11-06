const express = require("express");
const { WebSocketServer } = require("ws");
const { spawn } = require("child_process");
const {
  WebSocketMessageReader,
  WebSocketMessageWriter,
  createConnection: createWSConnection, // Rename to avoid conflict
} = require("vscode-ws-jsonrpc");
const {
  StreamMessageReader,
  StreamMessageWriter,
  createConnection, // This is for the process
} = require("vscode-jsonrpc/node");
const { forward } = require("vscode-ws-jsonrpc/server");

const app = express();
const PORT = 3001;

// ... (Your 'servers' object remains the same)
const servers = {
  javascript: ["typescript-language-server", ["--stdio"]],
  python: ["pyright-langserver", ["--stdio"]],
  java: [
    "java",
    [
      "-Declipse.application=org.eclipse.jdt.ls.core.id1",
      "-Dosgi.bundles.defaultStartLevel=4",
      "-Declipse.product=org.eclipse.jdt.ls.core.product",
      "-Dlog.protocol=true",
      "-Dlog.level=ALL",
      "-Xms1g",
      "-Xmx2G",
      "-jar", "/media/k/OS/Users/SPKR/projects/200 days challenge/projects/codeexe/LSP/java/jdt-language-server-1.9.0-202203031534/plugins/org.eclipse.equinox.launcher_1.6.400.v20210924-0641.jar",
      "-configuration", "/media/k/OS/Users/SPKR/projects/200 days challenge/projects/codeexe/LSP/java/jdt-language-server-1.9.0-202203031534/config_linux",
      "-data", "/media/k/OS/Users/SPKR/projects/200 days challenge/projects/codeexe/LSP/java/workspace"
    ]
  ],
  c: ["clangd", []],
  cpp: ["clangd", []],
};

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (socket, req) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const language = url.searchParams.get("language");

    console.log(`[LSP] Client connected for: ${language}`);

    if (!servers[language]) {
      console.error(`[LSP] No server found for language: ${language}`);
      socket.close();
      return;
    }

    const [cmd, args] = servers[language];
    const child = spawn(cmd, args);

    child.stderr.on("data", (data) => console.error(`[${language} error]:`, data.toString()));

    // Create a connection for the spawned LSP server
    const serverConnection = createConnection(
      new StreamMessageReader(child.stdout),
      new StreamMessageWriter(child.stdin)
    );

    // Create a connection for the WebSocket
    const wsReader = new WebSocketMessageReader(socket);
    const wsWriter = new WebSocketMessageWriter(socket);
    const clientConnection = createWSConnection(wsReader, wsWriter);

    // **THIS IS THE FIX:**
    // Forward messages between the client (WebSocket) and server (stdio)
    forward(clientConnection, serverConnection, (message) => {
      // You can intercept and log messages here if you need to
      return message;
    });

    socket.on("close", () => {
      console.log(`[LSP] Disconnected from ${language}`);
      serverConnection.dispose();
      clientConnection.dispose();
      child.kill();
    });
  } catch (err) {
    console.error("[LSP] Connection error:", err);
  }
});

console.log(`LSP WebSocket bridge running on: ws://localhost:${PORT}`);
// The app.listen(3000) is not needed for the LSP part,
// but you can keep it if you have other HTTP routes.