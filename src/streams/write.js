import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    const pathToFile = path.join(__dirname, '/files/fileToWrite.txt');
    const writeStream = fs.createWriteStream(pathToFile, 'utf8');
    process.stdout.write(
        " Hello! Enter any text to write it to file...(press crtl+c to exit)\n"
    )
    process.stdin.on('data', (data) => {
        writeStream.write(data);
    })

};

await write();