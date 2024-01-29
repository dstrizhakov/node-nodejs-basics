import {createReadStream} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'url';
import {createHash} from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFile = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    return new Promise((resolve, reject) => {
        const fileStream = createReadStream(pathToFile);
        const hash = createHash('sha256');

        fileStream
            .on('data', (data) => {
                hash.update(data);
            })
            .on('end', () => {
                console.log(hash.digest('hex'));
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            })
    })

};

await calculateHash();