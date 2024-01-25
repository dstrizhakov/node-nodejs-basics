import { argv } from 'node:process'

const parseArgs = () => {
    argv.forEach((arg, index) => {
        if (arg.startsWith('--'))
        console.log(`${arg} is ${argv?.[index + 1]}`)
    })
};

parseArgs();