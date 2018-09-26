/*
* Cria e exporta variaveis de configuração
*/

// Container para os environments
var environments = {};

// staging (default) environment
environments.staging = {
  'port': 3000,
  'envName': 'Staging'
};

environments.production = {
  'port': 5000,
  'envName': 'production'
};

// Determina qual environment foi passado como argumento na linha de comando
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// checa se o environment atual é um dos acima, se não vai para o staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;


// Exporta o module
module.exports = environmentToExport;
