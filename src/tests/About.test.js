import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Requisto 2 - componente About', () => {
    test('Contém um heading h2 com o texto About Pokédex', () => {
        const { getByText } = renderWithRouter(<About />);
        const aboutText = getByText(/About Pokédex/i);
        expect(aboutText).toBeInTheDocument();
    });
    test('Contém imagem com src específico', () => {
      // https://github.com/tryber/sd-011-project-react-testing-library/pull/85/files - ana clara  kyotoku
      const { getByRole } = renderWithRouter(<About />);
      const image = getByRole('img');
      const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      expect(image.src).toContain(url);
    });
})
