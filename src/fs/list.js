import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const pathToFolder = path.join(__dirname, 'files');
    try {
        const files = await fs.readdir(pathToFolder);
        files.forEach(filename => console.log(filename))
    } catch (error) {
        throw Error('FS operation failed')
    }
};

await list();