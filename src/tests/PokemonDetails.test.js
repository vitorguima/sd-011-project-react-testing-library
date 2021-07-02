import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const MORE_DETAILS = 'More details';

describe('Testes do componente PokemonDetails', () => {
  it('Verifica se há informações detalhadas do Pokémon selecionado', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(MORE_DETAILS);
    fireEvent.click(moreDetails);

    const nameDetails = getByText(`${pokemons[0].name} Details`);
    expect(nameDetails).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const headingSumary = getAllByRole('heading', { level: 2 });
    expect(headingSumary[1]).toBeInTheDocument();
    expect(headingSumary[1].innerHTML).toBe('Summary');

    const paragraph = getByText(/This intelligent Pokémon roasts hard berries/);
    expect(paragraph).toBeInTheDocument();
  });

  it('Verifica se existe mapas contendo as localizações do pokémon', () => {
    const { getByText, getAllByRole, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(MORE_DETAILS);
    fireEvent.click(moreDetails);

    const headingSumary = getAllByRole('heading', { level: 2 });
    expect(headingSumary[2]).toBeInTheDocument();
    expect(headingSumary[2].innerHTML).toBe(`Game Locations of ${pokemons[0].name}`);

    const locations = getAllByAltText(`${pokemons[0].name} location`);
    const pikachuLocations = 2;
    expect(locations.length).toBe(pikachuLocations);

    const pokemonLocations = pokemons[0].foundAt;
    pokemonLocations.forEach((oneLocation, index) => {
      const nameLocation = getByText(`${oneLocation.location}`);
      expect(nameLocation).toBeInTheDocument();
      const imageLocation = getAllByAltText(`${pokemons[0].name} location`);
      expect(imageLocation[index]).toBeInTheDocument();
      expect(imageLocation[index].src).toBe(oneLocation.map);
      expect(imageLocation[index].alt).toBe(`${pokemons[0].name} location`);
    });
  });

  it('Verifica é possível favoritar um pokémon na página de detalhes', () => {
    const { getByText, getByRole, getByAltText, getByLabelText } = renderWithRouter(
      <App />,
    );
    const moreDetails = getByText(MORE_DETAILS);
    fireEvent.click(moreDetails);

    const checkboxFavorite = getByRole('checkbox');
    expect(checkboxFavorite).toBeInTheDocument();

    fireEvent.click(checkboxFavorite);
    const favoriteIcon = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favoriteIcon).toBeInTheDocument();
    fireEvent.click(checkboxFavorite);
    expect(favoriteIcon).not.toBeInTheDocument();

    const labelFavorite = getByLabelText(/pokémon favoritado/i);
    expect(labelFavorite).toBeInTheDocument();
  });
});
