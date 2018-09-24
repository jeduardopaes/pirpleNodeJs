/*
* Arquivo principal da API
*/

//dependências
const http = require('http');

//O servidor deve responder a todos os requestes com uma String.
const server = http.createServer(function (req, res){
  res.end('Oi Web\n');
});

//Inicializa o servidor que deve escutar a porta 3000.
server.listen(3000,function(){
  console.log('Servidor escutando porta 3000...');
});