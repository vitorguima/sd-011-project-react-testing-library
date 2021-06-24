import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa os elementos da aplicação Favorites Pokémons', () => {
  it('mensagem no favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const noMatch = getByText('No favorite pokemon found');
    expect(noMatch).toBeInTheDocument();
  });
  it('e exibido todos os cards favoritados', () => {
    const { getByText } = renderWithRouter(<App />);
    const events = ['More details', 'Pokémon favoritado?', 'Home', 'Próximo pokémon',
      'More details', 'Pokémon favoritado?', 'Favorite Pokémons'];

    for (const event of events) { fireEvent.click(getByText(event)) }

    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Charmander')).toBeInTheDocument();
  });
});
