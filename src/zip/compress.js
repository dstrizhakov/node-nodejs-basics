import path from 'node:path';
import {createGzip} from 'node:zlib';
import {pipeline} from 'node:stream';
import {
    stat,
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

   stat(pathToFile, (err, stats) => {console.log(err ? err : `Размер исходного файла ${stats.size} байт`)})

    await new Promise((resolve, reject) => {
        pipeline(source, gzip, destination, (error) => {
            if (error) {
                reject(error);
                throw Error(error.message)
            } else {
                stat(pathToCompressedFile, (err, stats) => {console.log(err ? err : `Размер архива ${stats.size} байт`)})
                resolve();
            }
        })
    })
};

await compress();