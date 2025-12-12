const fs = require('fs');
const path = require('path');
const { countNamesFromFile } = require('../src/contarNomes');

const input = process.argv[2] || path.join(__dirname, '..', 'Amostra_30_07_2025_821_teste-1.json');
const out = process.argv[3] || path.join(process.cwd(), 'src', 'output', 'contagem.json');

try {
  const result = countNamesFromFile(input);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(result, null, 2), 'utf8');
  console.log('Arquivo criado:', out);
} catch (err) {
  console.error('Erro ao gerar contagem:', err.message);
  process.exitCode = 1;
}
