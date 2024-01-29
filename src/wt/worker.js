import {parentPort, workerData} from 'node:worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    // get the argument workerData from main thread
    const currentResult = nthFibonacci(workerData);

    // to check case if worker throw error
    // if (workerData > 12) {
    //     throw Error('nthFibonacci return Error');
    // }

    // transmit result to main thread
    parentPort.postMessage(currentResult);
};

sendResult();