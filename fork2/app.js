const childProcess = require('child_process')
const http = require('http')
const port = 3000;
const host = '127.0.0.1';
const requestListener = function (req, res) {
  if (req.url === '/total') {
    const myChildProcess = childProcess.fork(__dirname +'/childScript.js')
    myChildProcess.on('message', (childMessage) => {
      console.log('log messages from my child', childMessage);
    });
    myChildProcess.send({ parent: 'Be good my child!' });
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