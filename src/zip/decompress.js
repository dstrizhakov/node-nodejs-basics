import path from 'node:path';
import {createGunzip} from 'node:zlib';
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

const decompress = async () => {
    const unzip = createGunzip();
    const source = createReadStream(pathToCompressedFile);
    const destination = createWriteStream(pathToFile);

    await new Promise((resolve, reject) => {
        pipeline(source, unzip, destination, (error) => {
            if (error) {
                reject(error)
            } else {
                resolve();
            }
        })
    })

};

await decompress();