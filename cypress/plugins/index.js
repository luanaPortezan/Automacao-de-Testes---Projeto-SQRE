/// <reference types="cypress" />
const fs = require('fs');
const path = require('path');
const { countNamesFromFile } = require('../../src/contarNomes');

function timestampString() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

module.exports = (on, config) => {
  on('task', {
    countNamesFromFile(relPath) {
      try {
        const filePath = path.isAbsolute(relPath) ? relPath : path.resolve(process.cwd(), relPath);
        const result = countNamesFromFile(filePath);
        return result;
      } catch (err) {
        throw err;
      }
    },
    saveContagemFile({ data, prefix = 'contagem' }) {
      try {
        const ts = timestampString();
        const fileName = `${prefix}-${ts}.json`;
        const dir = path.resolve(process.cwd(), 'src', 'output');
        fs.mkdirSync(dir, { recursive: true });
        const filePath = path.join(dir, fileName);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return { filename: fileName, path: filePath };
      } catch (err) {
        throw err;
      }
    }
  });
};
