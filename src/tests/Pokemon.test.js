import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon', () => {
  it('Testa se é renderizado um card com o nome do Pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const heading = getByTestId(/pokemon-name/i);
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Pikachu');
  });

  it('Testa se é renderizado um card com o tipo e peso do Pokémon', () => {
    const { getByText, getAllByText, getByAltText } = renderWithRouter(<App />);

    const typePokemon = getAllByText(/Electric/i);
    expect(typePokemon[0]).toBeInTheDocument();

    const weight = getByText(/Average weight: 6.0 kg/i);
    expect(weight).toBeInTheDocument();

    const img = getByAltText(/Pikachu sprite/i);
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se existe o link "More details"', () => {
    const { getByText } = renderWithRouter(<App />);

    const detailsText = getByText(/More details/i);
    expect(detailsText).toBeInTheDocument();
  });

  it('Testa se existe o id do Pokémon ao clicar em More Details', () => {
    const {
      getByText,
      getByTestId,
      getByAltText,
      getByLabelText,
      history,
    } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const typePokemon = getByTestId(/pokemon-type/i);
    expect(typePokemon.textContent).toBe('Electric');

    fireEvent.click(getByLabelText(/Pokémon favoritado/i));
    const img = getByAltText(/Pikachu is marked as favorite/i);
    expect(img.src).toContain('star-icon.svg');
  });
});
