import {createWriteStream} from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToFile = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    await new Promise((resolve, reject) => {
        const writeStream = createWriteStream(pathToFile, 'utf8');
        writeStream
            .on('error', (error) => {
                reject(error);
            })
            .on('finish', () => {
                process.stdout.write('Data saved to file. Close process...\n')
                process.exit();
            })
        process.stdout.write(
            "Hello! Enter some text to write it to file...(write 'exit' or press crtl+c to exit)\n"
        )
        process.stdin.on('data', (data) => {
            if (data.toString().toLowerCase().trim() === "exit") {
                writeStream.end();
            } else {
                writeStream.write(data);
            }
        })
    })
};

await write();