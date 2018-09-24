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

  //Pega o query String como um objeto (Query = variaveis passadas através da URL)
  let queryStringObject = parsedUrl.query;

  //Pega o metodo(verbo) HTTP 
  let method = req.method.toLowerCase();

  //Pega o Header como um objeto
  let headers = req.headers;

  //Envia uma resposta
  res.end('Oi Web\n');

  //Log o Path requisitado
  console.log('Requisição de: '+method+' para o caminho: '+trimmedPath+' com os parametros: ',queryStringObject);
  console.log('Headers do request: ',headers);
});

//Inicializa o servidor que deve escutar a porta 3000.
server.listen(3000,function(){
  console.log('Servidor escutando porta 3000...');
});