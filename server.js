const http = require('http');
const fs = require('fs');
const path = require('path');
const base = path.join(__dirname, 'dist');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  const file = path.join(base, path.basename(url));
  const target = fs.existsSync(file) ? file : path.join(base, 'index.html');
  res.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'text/plain' });
  fs.createReadStream(target).pipe(res);
}).listen(4173, () => console.log('Check My Payments preview running at http://localhost:4173'));
