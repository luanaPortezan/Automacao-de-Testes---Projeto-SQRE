const { countNamesFromFile } = require('./src/contarNomes');

// Uso CLI: node contarNomes.js [caminho/do/arquivo.json]
const fileArg = process.argv[2] || './Amostra_30_07_2025_821_teste-1.json';
try {
  const result = countNamesFromFile(fileArg);

  console.log("Contagem de valores únicos da chave 'nome':");
  Object.entries(result.counts).forEach(([nome, qtd]) => {
    console.log(`- ${nome}: ${qtd}`);
  });

  console.log(`\nTotal de produtos: ${result.total}`);
} catch (err) {
  console.error('Erro ao processar arquivo:', err.message);
  process.exitCode = 1;
}