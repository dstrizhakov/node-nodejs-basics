import path from 'node:path';
import {createGzip} from 'node:zlib';
import {pipeline} from 'node:stream';
import {
    createReadStream,
    createWriteStream,
} from 'node:fs';

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFile = path.join(__dirname, 'files', 'fileToCompress.txt');
const pathToCompressedFile = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    const gzip = createGzip();
    const source = createReadStream(pathToFile);
    const destination = createWriteStream(pathToCompressedFile);

    await new Promise((resolve, reject) => {
        pipeline(source, gzip, destination, (error) => {
            if (error) {
                reject(error)
            } else {
                resolve();
            }
        })
    })
};

await compress();