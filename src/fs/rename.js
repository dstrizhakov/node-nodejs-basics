import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToWrongFile = path.join(__dirname, 'files', 'wrongFilename.txt');
const pathToProperFile = path.join(__dirname, 'files', 'properFilename.md');


const rename = async () => {
   try {
    await fs.access(pathToProperFile);
    throw Error();
   } catch (error) {
    if (error.code === 'ENOENT') {
        try {
            await fs.access(pathToWrongFile);
            await fs.rename(pathToWrongFile, pathToProperFile);
        } catch (error) {
            throw Error('FS operation failed')
        }
    } else {
        throw Error('FS operation failed')
    }
   }
};

await rename();