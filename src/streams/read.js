import {createReadStream} from "node:fs";
import path from 'node:path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFile = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    await new Promise((resolve, reject) => {
        const readStream = createReadStream(pathToFile);
        readStream
            .on('data', (chunk) => {
                process.stdout.write(chunk);
            })
            .on('error', (error) => {
                reject(error);
            })
            .on('end', () => {
                resolve();
            })
    })

};

await read();