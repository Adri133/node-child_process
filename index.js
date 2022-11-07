// ExecFile
import { execFile } from 'child_process';
const child = execFile('node', ['exec.js'], (error, stdout, stderr) => {
    if (error) {
        console.error('stderr', stderr);
        throw error;
    }
    console.log('stdout', stdout);
});

//Spawn

import {spawn} from 'child_process';
import fs from 'fs';
function resize(req, resp) {
    const args = [
        "-", // use stdin
        "-resize", "640x", // resize width to 640
        "-resize", "x360<", // resize height if it's smaller than 360
        "-gravity", "center", // sets the offset to the center
        "-crop", "640x360+0+0", // crop
        "-" // output to stdout
    ];

    const streamIn = fs.createReadStream('./path/to/an/image');
    const proc = spawn('convert', args);
    streamIn.pipe(proc.stdin);
    proc.stdout.pipe(resp);
}

//Exec



// Fork 

import http from 'http';
import { fork } from 'child_process';

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.url === '/compute') {
    const compute = fork('compute.js');
    // compute.send('start');
    console.log('compute');
    compute.on('message', sum => {
      res.end(`Sum is ${sum}`);
    });
  } else {
    res.end('Ok')
  }
});

server.listen(3000);