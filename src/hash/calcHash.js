import * as fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    const pathToFile = path.join(__dirname, 'files/fileToCalculateHashFor.txt');

    const fileStream = fs.createReadStream(pathToFile);
    fileStream.on('error', () => {
        throw Error ('Create stream from file failed')
    });
    
    const hash = crypto.createHash('sha256');
    fileStream
    .on('readable', () => {
        const data = fileStream.read();
        if (data) {
            hash.update(data);
        } else {
            console.log(hash.digest('hex'))
        }
    })
    .on('error', () => {
        throw Error ('Hash calculating failed')
    })

};

await calculateHash();