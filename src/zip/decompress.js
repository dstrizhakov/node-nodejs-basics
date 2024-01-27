import path from 'node:path';
import { createUnzip } from 'node:zlib';
import { pipeline } from 'node:stream';
import {
    createReadStream,
    createWriteStream,
} from 'node:fs';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const pathToFile = path.join(__dirname, '/files/fileToCompress.txt');
    const pathToCompressedFile = path.join(__dirname, '/files/archive.txt.gz');

    const unzip = createUnzip();
    const source = createReadStream(pathToCompressedFile);
    const destination = createWriteStream(pathToFile);

    pipeline(source, unzip, destination, (error) => {
        if (error) {
            console.error('An error occurred:', error);
            process.exitCode = 1;
        }
    })
};

await decompress();