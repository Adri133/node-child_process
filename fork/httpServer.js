import http from 'http';
import {fork} from 'child_process'
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);

const host = 'localhost';
const port = 8000;

const slowFunction = () => {
  let counter = 0;
  while (counter < 5) {
    counter++;
  }

  return counter;
}
const __dirname = path.dirname(__filename);
const requestListener = function (req, res) {
  if (req.url === '/total') {
    const child = fork(__dirname + '/getCount');
    console.log('total url');

    child.on('message', (message) => {
      console.log('Returning /total results');
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(message);
    });

    child.send('START');
  } else if (req.url === '/hello') {
    console.log('Returning /hello results');
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(`{"message":"hello"}`);
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});