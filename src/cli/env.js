import { env } from 'node:process';

const parseEnv = () => {
   for (let field in env) {
       if( field.startsWith("RSS_")) {
           console.log(`${field}=${env[field]}`)
       }
   }

};

parseEnv();