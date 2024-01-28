const parseArgs = () => {
    process.argv.forEach((arg, index) => {
        if (arg.startsWith('--'))
            console.log(`${arg} is ${process.argv?.[index + 1]}`)
    })
};

parseArgs();