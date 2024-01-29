import {access, rename as renameFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToWrongFile = path.join(__dirname, 'files', 'wrongFilename.txt');
const pathToProperFile = path.join(__dirname, 'files', 'wrongFilename.txt');

const rename = async () => {
    try {
        await access(pathToProperFile);
        throw Error('FS operation failed: Target file already exists');
    } catch (error) {
        if (error.code === 'ENOENT') {
            try {
                await access(pathToWrongFile);
                await renameFile(pathToWrongFile, pathToProperFile);
            } catch (error) {
                throw Error('FS operation failed')
            }
        } else {
            throw Error('FS operation failed')
        }
    }
};

await rename();