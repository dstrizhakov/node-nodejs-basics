import {spawn} from 'node:child_process'
import path from 'node:path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToFile = path.join(__dirname, '/files/script.js');

const spawnChildProcess = async (args) => {
    const childProcess = spawn('node', [pathToFile, ...args]);

    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);
};

await spawnChildProcess(['someArgument1', 'someArgument2']);
