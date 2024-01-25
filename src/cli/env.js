
const parseEnv = () => {
   for (let field in process.env) {
       if( field.startsWith("RSS_")) {
           console.log(`${field}=${process.env[field]}`)
       }
   }

};

parseEnv();