import {readdir, stat, mkdir, copyFile, access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fromFolder = path.join(__dirname, "files");
const toFolder = path.join(__dirname, "files-copy");

const copyFileOrFolder = async (source, destination) => {
    const files = await readdir(source);
    for (const file of files) {
        const sourceFilePath = path.join(source, file);
        const destinationFilePath = path.join(destination, file);
        const statistic = await stat(sourceFilePath);
        if (statistic.isDirectory()) {
            await mkdir(destinationFilePath)
            await copyFileOrFolder(sourceFilePath, destinationFilePath);
        } else {
            await copyFile(sourceFilePath, destinationFilePath);
        }
    }
}

const copy = async () => {
    try {
        await access(fromFolder);
        await access(toFolder);
        throw Error('Destination folder already exists')
    } catch (error) {
        if (error.code === 'ENOENT') {
            try {
                await mkdir(toFolder);
                await copyFileOrFolder(fromFolder, toFolder);
            } catch (error) {
                throw Error('FS operation failed')
            }
        } else {
            throw Error('FS operation failed')
        }
    }
};

await copy();
