describe('Contagem de nomes - script Nomes', () => {
  it('deve retornar objeto de contagem, montar relatório no DOM e salvar screenshot', () => {
    cy.task('countNamesFromFile', 'Amostra_30_07_2025_821_teste-1.json').then(result => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('counts');
      expect(result).to.have.property('total');

      // salvar o JSON com timestamp via task do plugin (vai para src/output)
      cy.task('saveContagemFile', { data: result, prefix: 'contagem' }).then(saved => {
        const baseName = saved.filename.replace(/\.json$/i, '');

        // montar um relatório simples no DOM para capturar screenshot
        cy.document().then(doc => {
          const pre = doc.createElement('pre');
          pre.id = 'relatorio-contagem';
          pre.style.whiteSpace = 'pre-wrap';
          pre.style.fontFamily = 'monospace';
          pre.style.fontSize = '12px';
          pre.textContent = JSON.stringify(result, null, 2);
          doc.body.appendChild(pre);
        });

        // garantir renderização e tirar screenshot com nome único
        cy.get('#relatorio-contagem').should('exist');
        cy.screenshot(baseName);
      });
    });
  });
});
