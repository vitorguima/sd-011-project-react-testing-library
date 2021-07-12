import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com o nome correto do Pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const namePokemon = getByTestId(/pokemon-name/i);
    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon.innerHTML).toBe('Pikachu');
  });
  it('Teste se é renderizado um card com o peso correto do Pokémon', () => {
    const { getByTestId } = renderWithRouter(
      <App />,
    );
    const weightPokemon = getByTestId(/pokemon-weight/i);
    expect(weightPokemon).toBeInTheDocument();
    expect(weightPokemon.textContent).toBe('Average weight: 6.0 kg');
  });
  it('Teste se é renderizado um card com o tipo correto do Pokémon', () => {
    const { getAllByText } = renderWithRouter(
      <App />,
    );
    const typePokemon = getAllByText(/electric/i);
    expect(typePokemon[0]).toBeInTheDocument();
  });
  it('Teste se é exibida a imagem do Pokémon', () => {
    const { getByAltText } = renderWithRouter(
      <App />,
    );
    const imagePokemon = getByAltText(/Pikachu sprite/i);
    expect(imagePokemon).toBeInTheDocument();
    expect(imagePokemon.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Teste se é exibido o link More details, o link deve possuir a URL /pokemons/<id>',
    () => {
      const { getByText, getByAltText,
        getByTestId, history } = renderWithRouter(<App />);
      const linkNav = getByText(/more details/i);
      fireEvent.click(linkNav);
      const { pathname } = history.location;
      expect(pathname).toBe('/pokemons/25');
      // const typePokemon = getAllByText(/pikachu/i);
      // expect(typePokemon[0]).toBeInTheDocument();
      const typePokemon = getByTestId(/pokemon-type/i);
      expect(typePokemon.textContent).toBe('Electric');
      const favoritePokemon = getByText(/Pokémon favoritado/i);
      fireEvent.click(favoritePokemon);
      const imgPokemon = getByAltText(/pikachu is marked as favorite/i);
      expect(imgPokemon.src).toContain('/star-icon.svg');
    });
});
