import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pikachu = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  },
];

describe('Testa componente Pokemon', () => {
  it('Verifica se é renderizado um card com as informações de 1 pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App pokemon={ pikachu } />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    const pokemonImg = getByAltText('Pikachu sprite');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Verifica se o card possui URL /pokemons/<id>', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const btnDetailsPokemon = getByRole('link', { name: /More details/i });
    fireEvent.click(btnDetailsPokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByRole, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const btnDetails = getByRole('link', { name: /More details/i });
    fireEvent.click(btnDetails);
    const favoritePokemon = getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(favoritePokemon);
    const starIcon = getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});

/* Repositórios consultados:
https://github.com/tryber/sd-011-project-react-testing-library/pull/59/files
https://github.com/tryber/sd-011-project-react-testing-library/pull/5/files
https://github.com/tryber/sd-011-project-react-testing-library/pull/33/files */
