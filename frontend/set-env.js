const { writeFileSync } = require('fs');
const { resolve } = require('path');
require('dotenv').config();

const targetPathDev = './src/environments/environment.ts';
const targetPathProd = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  apiUrl: '${process.env.API_URL}'
};
`;

writeFileSync(resolve(__dirname, targetPathDev), envConfigFile, { encoding: 'utf8' });
writeFileSync(resolve(__dirname, targetPathProd), envConfigFile, { encoding: 'utf8' });
console.log(`Output generated at ${targetPathDev} and ${targetPathProd}`);