const fs = require('fs');
const path = require('path');

function countNamesFromData(data) {
  const contagem = {};
  if (!data || !Array.isArray(data.pedidos)) return { counts: contagem, total: 0 };

  data.pedidos.forEach(pedido => {
    if (pedido.listaProdutos) {
      pedido.listaProdutos.forEach(produto => {
        const nome = produto.nome;
        if (nome) {
          contagem[nome] = (contagem[nome] || 0) + 1;
        }
      });
    }
  });

  const total = Object.values(contagem).reduce((a, b) => a + b, 0);
  return { counts: contagem, total };
}

function countNamesFromFile(filePath) {
  const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  const raw = fs.readFileSync(resolved, 'utf8');
  const data = JSON.parse(raw);
  return countNamesFromData(data);
}

module.exports = { countNamesFromData, countNamesFromFile };
