import { createServer } from 'http';
import { parse } from 'url';
import { readFile } from 'fs';

createServer(
    function (req,res){
        let queue = parse(req.url, true);
        let pathname = queue.pathname === '/' ? '/testeRequisicoes.html' : queue.pathname;
        let filename = "./mod1" + pathname; 
        console.log(queue);
        console.log(filename);

        readFile(filename, function(err, data){
            console.log(err);
            if (err) {
                res.writeHead(404, {'Content-Type':'text/html'});
                return res.end("404 NOT FOUND");
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    }
).listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080');
});