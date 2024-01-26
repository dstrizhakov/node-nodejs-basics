import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFile = path.join(__dirname, 'files', 'fresh.txt');

const remove = async () => {
    try {
        await fs.rm(pathToFile)
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await remove();