import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Componente <PokemonDetails />', () => {
  it('Verifica se informações de determinado pokemon é mostrado na tela', () => {
    const { getByText } = renderWithRouter(<App />);

    const moreDetails = getByText(/More Details/i);
    fireEvent.click(moreDetails);

    const pikachuDetails = getByText('Pikachu Details');
    const h2Summary = getByText('Summary');
    const pokemonDetails = getByText(/This intelligent Pokémon roasts hard berries/i);

    expect(pikachuDetails).toBeInTheDocument();
    expect(h2Summary).toBeInTheDocument();
    expect(pokemonDetails).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
  });

  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);

    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);

    const h2 = getByText(/Game Locations of Pikachu/i);
    const pokemonLocations = getAllByAltText(/Pikachu location/i);

    expect(h2).toBeInTheDocument();

    pokemonLocations.forEach((pokemon) => {
      expect(pokemon).toBeInTheDocument();
      expect(pokemon).toHaveAttribute('src');
    });
  });

  it('Teste se o usuário pode favoritar um pokémon pela da página de detalhes.', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);

    const moreDetails = getByText(/more details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);

    const favoriteCheckbox = getByLabelText(/pokémon favoritado/i);
    expect(favoriteCheckbox).toBeInTheDocument();
    fireEvent.click(favoriteCheckbox);

    expect(favoriteCheckbox).toBeChecked();
    fireEvent.click(favoriteCheckbox);

    expect(favoriteCheckbox).not.toBeChecked();
  });
});
