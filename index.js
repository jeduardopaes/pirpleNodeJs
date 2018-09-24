/*
* Arquivo principal da API
*/

//dependências
const http = require('http');
const url = require('url');

//O servidor deve responder a todos os requestes com uma String.
const server = http.createServer(function (req, res){

  //Pega a requisição para URL e parse 
  let parsedUrl = url.parse(req.url,true);
  //Pega o Path(caminho)
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g,"");

  //Envia uma resposta
  res.end('Oi Web\n');

  //Log o Path requisitado
  console.log('Requisição para o caminho: '+trimmedPath+'\n');
});

//Inicializa o servidor que deve escutar a porta 3000.
server.listen(3000,function(){
  console.log('Servidor escutando porta 3000...');
});