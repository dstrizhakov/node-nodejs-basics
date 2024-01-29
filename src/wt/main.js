import os from 'node:os'
import {Worker, isMainThread} from 'node:worker_threads';
import path from 'node:path';

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToWorkerFile = path.join(__dirname, 'worker.js');

function runWorker(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(pathToWorkerFile, {workerData});
        worker
            .once('message', (data) => {
                resolve({status: 'resolved', data})
            })
            .once('error', () => {
                reject({status: 'rejected', data: null});
            })
    })
}

const performCalculations = async () => {
    const cpusLimit = os.cpus().length;
    const promisesArray = [];
    if (isMainThread) {
        for (let i = 0; i < cpusLimit; i++) {
            promisesArray.push(runWorker(10 + i))
        }

        // if we need to get results in case of reject some of worker
        await Promise
            .allSettled(promisesArray)
            .then(result => console.log(result.map(res => res.value || res.reason)))
            .catch(error => console.log(error));

        // all or nothing
        // await Promise
        //     .all(promisesArray)
        //     .then(result => console.log(result))
        //     .catch(error => console.log(error));

    }
};

await performCalculations();