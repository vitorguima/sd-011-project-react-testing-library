import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('shows the Pokédex when the route is `/`.', () => {
  test('Teste o componente About.js .', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('Teste se o topo da aplicação contém um conjunto fixo de links', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});
