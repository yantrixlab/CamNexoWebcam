// Tiny static server for previewing the website locally: node web/serve.js [port]
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.argv[2]) || 5180;
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml; charset=utf-8", ".json": "application/json",
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split("?")[0]);
  if (rel.endsWith("/")) rel += "index.html";
  const file = path.normalize(path.join(root, rel));
  if (!file.startsWith(root)) { res.writeHead(403).end("Forbidden"); return; }
  fs.readFile(file, (err, data) => {
    if (err) {
      fs.readFile(path.join(root, "404.html"), (e2, page) => {
        res.writeHead(404, { "Content-Type": types[".html"] }).end(e2 ? "Not found" : page);
      });
      return;
    }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" }).end(data);
  });
}).listen(port, () => console.log("CamNexo site on http://localhost:" + port));
