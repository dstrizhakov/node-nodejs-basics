import {Transform} from 'node:stream';

const transform = async () => {
    const reverseStream = new Transform({
        transform(chunk, encoding, callback) {
            callback(null, chunk.toString().split('').reverse().join(''));
        },
    });
    await new Promise((resolve, reject) => {
        process.stdin
            .pipe(reverseStream)
            .pipe(process.stdout)
            .on('finish', () => resolve())
            .on('error', (error) => {
                console.log(error);
                reject(error.message);
            });
    })
};

await transform();
