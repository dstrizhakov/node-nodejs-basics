import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFile = path.join(__dirname, 'files/fileToRead.txt');

const read = async () => {
    try {
        console.log(await readFile(pathToFile, 'utf-8'))
    } catch (error) {
        throw Error('FS operation failed')
    }
};

await read();
