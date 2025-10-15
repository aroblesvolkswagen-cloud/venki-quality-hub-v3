#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const pasosPath = path.join(__dirname, '..', 'PASOS.txt');

function printDivider() {
  console.log(''.padEnd(60, '='));
}

console.log();
printDivider();
console.log(' PASOS PARA VER LA APLICACIÓN ');
printDivider();
console.log();

try {
  const contenido = fs.readFileSync(pasosPath, 'utf8');
  console.log(contenido.trim());
  console.log();
  printDivider();
  console.log('\nConsejo: Puedes copiar estos pasos con click derecho en la terminal o con Ctrl+C / Cmd+C.');
  console.log('Si algo no funciona, revisa la sección "Problemas frecuentes" del README.');
  console.log();
} catch (error) {
  console.error('No se pudo leer el archivo PASOS.txt.');
  console.error(error.message);
  process.exit(1);
}
