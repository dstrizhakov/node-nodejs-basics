import path from 'path';
import {release, version} from 'os';
import {createServer as createServerHttp} from 'node:http';
import {createRequire} from 'node:module';
import './files/c.js'

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const random = Math.random();

let unknownObject;

// Import assertions are not a stable feature of the JavaScript language.
// but it's possible in Node version 20 and we can await import

// await import ('./files/a.json', { assert: { type: 'json' }}).then(module => {
//     if (random > 0.5) {
//         unknownObject = module;
//     }
// })
// await import ('./files/b.json', { assert: { type: 'json' }}).then(module => {
//     if (random <= 0.5) {
//         unknownObject = module;
//     }
// })


// This solution is to make the import behave synchronously via createRequire

const require = createRequire(import.meta.url);

if (random > 0.5) {
    unknownObject = require('./files/a.json');
} else {
    unknownObject = require('./files/b.json');
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {unknownObject, myServer};

