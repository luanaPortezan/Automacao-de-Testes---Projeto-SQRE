describe('Contagem de nomes - script Nomes', () => {
  const SAMPLE = 'Amostra_30_07_2025_821_teste-1.json';

  it('retorna objeto válido e soma das contagens bate com total', () => {
    cy.task('countNamesFromFile', SAMPLE).then(result => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('counts').that.is.an('object');
      expect(result).to.have.property('total').that.is.a('number');

      const counts = result.counts;
      const keys = Object.keys(counts);
      expect(keys.length).to.be.greaterThan(0);

      const sum = Object.values(counts).reduce((acc, v) => acc + v, 0);
      expect(sum).to.equal(result.total);

      // cada valor deve ser inteiro positivo
      Object.values(counts).forEach(v => {
        expect(v).to.be.a('number');
        expect(v % 1).to.equal(0);
        expect(v).to.be.greaterThan(0);
      });
    });
  });

  it('salva contagem em arquivo e leitura do arquivo retorna mesmo resultado', () => {
    cy.task('countNamesFromFile', SAMPLE).then(original => {
      cy.task('saveContagemFile', { data: original, prefix: 'contagem' }).then(saved => {
        expect(saved).to.have.property('filename');
        expect(saved).to.have.property('path');

        // ler o arquivo salvo usando a mesma task de contagem (aceita path absoluto)
        cy.task('countNamesFromFile', saved.path).then(reloaded => {
          expect(reloaded).to.deep.equal(original);
        });
      });
    });
  });

  it('monta relatório no DOM e gera screenshot do relatório', () => {
    cy.task('countNamesFromFile', SAMPLE).then(result => {
      // montar relatório simples no DOM
      cy.document().then(doc => {
        const pre = doc.createElement('pre');
        pre.id = 'relatorio-contagem';
        pre.style.whiteSpace = 'pre-wrap';
        pre.style.fontFamily = 'monospace';
        pre.style.fontSize = '12px';
        pre.textContent = JSON.stringify(result, null, 2);
        doc.body.appendChild(pre);
      });

      // garantir renderização e que o conteúdo é JSON válido
      cy.get('#relatorio-contagem').should('exist').then($el => {
        const text = $el.text();
        expect(() => JSON.parse(text)).not.to.throw();
      });

      // tirar screenshot (nome com timestamp simples)
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      cy.screenshot(`contagem-${ts}`);
    });
  });
});
