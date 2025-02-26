// server.js
/* import { createServer } from 'http';
                    ou 
    const http = require('http');

A diferença está no sistema de módulos que você está usando:

require() usa o sistema CommonJS (mais antigo)
import usa o sistema ES Modules (mais moderno)

Para usar import, você precisa adicionar "type": "module" 
no seu package.json
*/
// server.mjs
import { createServer } from 'http';

const PORT = 3000;

const server = createServer((req, res) => {
    // Define CORS headers
    // É importante notar que CORS é uma restrição do navegador 
    // se você fizer uma requisição diretamente de um servidor 
    // de backend para backend, CORS não se aplica.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

/* OU 
// server.js
const http = require('http'); // a diferença está aqui!!

const PORT = 3000;

const server = http.createServer((req, res) => {  // a diferença está aqui!!
    // Define CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 */


    // por segurança o navegador atumaticamente verifica se é OPTIONS
    if (req.method === 'OPTIONS') {
        res.writeHead(204); // 204 significa "OK, sem conteúdo para retornar"
        res.end();
        return;
    } 

// const hostname = '127.0.0.1' é desnecessário.
/* O hostname = '127.0.0.1' e localhost são essencialmente a mesma coisa 
   Ambos se referem ao seu computador local.
No código usamos apenas a porta (PORT = 3000) porque o Node.js por padrão 
já usa localhost/127.0.0.1 quando você não especifica um hostname. */

    // Se NÃO for OPTIONS, continua e chega nas rotas
    // Handle routes
    if (req.url === '/') {
        switch (req.method) {
            case 'GET':
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Servidor rodando com sucesso!' }));
                break;
                
            case 'POST':
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                
                req.on('end', () => {
                    try {
                        const data = JSON.parse(body);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ 
                            message: 'Dados recebidos com sucesso!',
                            data: data 
                        }));
                    } catch (error) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Dados inválidos' }));
                    }
                });
                break;
                
            default:
                res.writeHead(405, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Método não permitido' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Rota não encontrada' }));
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});