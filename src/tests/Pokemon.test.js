import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 6', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      const { getByTestId, getByAltText } = renderWithRouter(<App />);
      expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
      expect(getByTestId('pokemon-type').textContent).toBe('Electric');
      expect(getByTestId('pokemon-weight').textContent).toBe('Average weight: 6.0 kg');
      expect(getByAltText('Pikachu sprite').src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });

  it(`Teste se o card do Pokémon indicado na Pokédex contém 
  um link de navegação para exibir detalhes deste Pokémon. 
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;`,
  () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText('More details');
    fireEvent.click(link);
    const path = history.location.pathname;

    expect(path).toBe('/pokemons/25');
    const pikaDetails = getByText('Pikachu Details');
    expect(pikaDetails).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.',
    () => {
      const { getByText, getByAltText } = renderWithRouter(<App />);
      const link = getByText('More details');
      fireEvent.click(link);

      const addFavorite = getByText('Pokémon favoritado?');
      fireEvent.click(addFavorite);

      const image = getByAltText('Pikachu is marked as favorite');
      expect(image).toBeInTheDocument();
      expect(image.src).toContain('/star-icon.svg');
    });
});
