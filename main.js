//Autor: Ivan Grana

import { createRequire } from 'module'; //Para versoes do Node acima da .14,é necessario importar o require
const require = createRequire(import.meta.url);

const mobilenet = require('@tensorflow-models/mobilenet');

const tfnode = require('@tensorflow/tfjs-node');

const fs = require('fs');

const importar_imagem = path => {
  // ler a imagem
  const imageBuffer = fs.readFileSync(path);
  const tfimage = tfnode.node.decodeImage(imageBuffer);
  return tfimage;
}

const Classificacao = async path => {
  const image = importar_imagem(path);
  // Carregar o modelo fornecido pelo mobilenet
  const mobilenetModel = await mobilenet.load();
  // Classificação da imagem
  const predictions = await mobilenetModel.classify(image);
  console.log('Resultado da classificação da imagem:', predictions);
}

if (process.argv.length !== 3) throw new Error('Utilizar a seguinte linha de comando: node main.js <arquivo>');

Classificacao(process.argv[2]);