import { createServer } from 'http';
import { readFile } from 'fs';

createServer(function (req, res) {
    // Caminho fixo para o arquivo HTML na mesma pasta do script
    const filename = './mod1/testeRequisicoes.html';
    
    readFile(filename, function(err, data) {
        if (err) {
            console.error('Erro:', err);
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 NOT FOUND");
        }
        
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080');
});