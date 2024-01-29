import {access, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFile = path.join(__dirname, 'files', 'fresh.txt');

const create = async () => {
    try {
        await access(pathToFile);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await writeFile(pathToFile, 'I am fresh and young');
        } else {
            throw new Error('FS operation failed');
        }
    }
};

await create();