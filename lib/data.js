/*
* Biblioteca para guardar e editar dados
*/

//Dependências
var fs = require('fs');
var path = require('path');

//Container para o module
var lib = {};

//Diretório base para a pasta de dados
lib.baseDir = path.join(__dirname, '/../.data/');

//Escrever no arquivo
lib.create = function (dir, file, data, callback) {
  // Abre arquivo para escrever
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      //Converte data para string
      var stringData = JSON.stringify(data);

      //Escrever no arquivo e facha-lo
      fs.writeFile(fileDescriptor, stringData, function (err) {
        if (!err) {
          //Fecha o arquivo
          fs.close(fileDescriptor, function (err) {
            if (!err) {
              callback(false);
            } else {
              callback('Erro ao fechar o arquivo.');
            }
          });
        } else {
          callback('Erro ao tentar gravar dados.');
        }
      });
    } else {
      callback('Não foi possível criar o arquivo, talvez o mesmo já exista.');
    }
  });
};

lib.read = function (dir, file, callback) {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8', function (err, data) {
    callback(err, data);
  });
};

lib.update = function (dir, file, data, callback) {

  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {

      var stringData = JSON.stringify(data);

      fs.truncate(fileDescriptor, function (err) {
        if (!err) {
          fs.writeFile(fileDescriptor, stringData, function (err) {
            if (!err) {
              fs.close(fileDescriptor, function (err) {
                if (!err) {
                  callback(false);
                } else {
                  callback('Não foi possível fechar o arquivo.');
                }
              });
            } else {
              callback('Não foi possível escrever dados no arquivo.');
            }
          });
        } else {
          callback('Erro ao tentar apagar o arquivo.');
        }
      });

    } else {
      callback('Erro Não foi possível abrir o arquivo, talvez ele não exista.');
    }
  });
};

lib.delete = function(dir, file, callback){
  fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
    if(!err){
      callback(false);
    }else{
      callback('Não foi possível excluir o arquivo');
    }
  });
};

module.exports = lib;