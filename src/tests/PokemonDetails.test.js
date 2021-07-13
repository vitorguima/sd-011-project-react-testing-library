import React from 'react';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      const { getByRole } = renderWithRouter(<PokemonDetails />);
      const tagName = getByRole('heading', { level: 2 });
      expect(tagName).toBeInTheDocument();
      expect(tagName).toHaveTextContent('Details');
    });
});
