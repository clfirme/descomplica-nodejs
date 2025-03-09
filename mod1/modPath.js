import {basename, dirname, extname} from 'path';
const filePath = './testeModPath.txt';
let nomeArquivo = basename(filePath);
console.log (nomeArquivo);
console.log(dirname(filePath));
console.log(extname(filePath));

