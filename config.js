/*
* Cria e exporta variaveis de configuração 
* Comando para criar arquivos certificados para o HTTPS
* openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pe
*/

// Container para os environments
var environments = {};

// staging (default) environment
environments.staging = {
  'httpPort': 3000,
  'httpsPort':3001,
  'envName': 'Staging'
};

environments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'envName': 'production'
};

// Determina qual environment foi passado como argumento na linha de comando
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// checa se o environment atual é um dos acima, se não vai para o staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;


// Exporta o module
module.exports = environmentToExport;
