/*
* Arquivo principal da API
*/

//dependências
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const fs = require('fs');
const config = require('./config');


//Instancia o servidor http.
const httpServer = http.createServer(function (req, res) {
  unifiedServer(req,res);
});

//Inicializa o servidor http.
httpServer.listen(config.httpPort, function () {
  console.log(`Servidor escutando porta ${config.httpPort}... in ${config.envName} mode ...`);
});

//Opções para o HTTPS
var httpsServerOptions ={
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pe')
};

//Instancia o servidor https
const httpsServer = https.createServer(httpsServerOptions, function(req,res){
  unifiedServer(req,res);
});

//Inicializa o servidor https
httpsServer.listen(config.httpsPort, function () {
  console.log(`Servidor escutando porta ${config.httpsPort}... in ${config.envName} mode ...`);
});

// Toda Logica do servidor para http ou https
var unifiedServer = function (req, res) {
  //Pega a requisição para URL e parse 
  let parsedUrl = url.parse(req.url, true);
  //Pega o Path(caminho)
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, "");

  //Pega o query String como um objeto (Query = variaveis passadas através da URL)
  let queryStringObject = parsedUrl.query;

  //Pega o metodo(verbo) HTTP 
  let method = req.method.toLowerCase();

  //Pega o Header como um objeto
  let headers = req.headers;

  //Pega o PayLoad(Body), se existir
  let decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });
  req.on('end', function () {
    buffer += decoder.end();

    //Escolhe o handler que o request deve ir. Se não foi encontrado nenhum handler usar o notFound.
    var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Constroi os dados(data) object para enviar ao handler
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    //Roteia o request para o handler especifico
    chosenHandler(data, function (statusCode, payload) {
      // Utilizar o status code do handler ou o default(padrão) 200
      statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
      // Utilizar o payload do handler ou default(padrão) do callback
      payload = typeof (payload) == 'object' ? payload : {};

      // Converte payload to string
      var payloadString = JSON.stringify(payload);

      //Envia resposta
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      //Log o Path requisitado
      console.log('Requisição de: ' + method + ' para o caminho: ' + trimmedPath + ' com os parametros: ', queryStringObject);
      console.log('Headers do request: ', headers);
      console.log('Payload: ', buffer);
      console.log('Resposta enviada: ', statusCode, payload);
    });

  });
};

// Define o handler
var handlers = {}

handlers.sample = function (data, callback) {
  // Callback uma http status code, e um payload object
  callback(406, { 'name': 'sample handler' });
};

// Not Found handler

handlers.notFound = function (data, callback) {
  callback(404);
};

// Define um request router
var router = {
  'sample': handlers.sample
};