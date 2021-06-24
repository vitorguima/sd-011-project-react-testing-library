import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [{
    location: 'Kanto Viridian Forest',
    map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
  },
  {
    location: 'Kanto Power Plant',
    map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
  }],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them'
    + ' tender enough to eat.',
};

const moreDetails = 'More details';

describe('Testa o componente <PokemonDetails.js />', () => {
  it('se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { getByRole, getByText, getByTestId, history } = renderWithRouter(<App />);
    const electricPokemonFilter = getByRole('button', { name: 'Electric' });
    const nextPokemonBtn = getByRole('button', { name: 'Próximo pokémon' });
    expect(electricPokemonFilter).toBeInTheDocument();
    expect(nextPokemonBtn).toBeInTheDocument();

    fireEvent.click(electricPokemonFilter);
    expect(nextPokemonBtn.disabled).toBe(true);

    const moreDetailsBtn = getByText(moreDetails);
    expect(moreDetailsBtn).toBeInTheDocument();

    fireEvent.click(moreDetailsBtn);
    const { pathname } = history.location;
    const { id, name, type, averageWeight, summary } = pokemon;
    const { value, measurementUnit } = averageWeight;
    expect(pathname).toBe(`/pokemons/${id}`);

    expect(getByText(`${name} Details`)).toBeInTheDocument();
    expect(getByTestId('pokemon-name')).toHaveTextContent(`${name}`);
    expect(getByTestId('pokemon-type')).toHaveTextContent(`${type}`);
    expect(getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(moreDetailsBtn).not.toBeInTheDocument();
    expect(getByText('Summary')).toBeInTheDocument();
    expect(getByText(summary)).toBeInTheDocument();
  });

  it('se existe na página os mapas contendo as localizações do pokémon', () => {
    const { getByRole, getByText, getAllByAltText, history } = renderWithRouter(<App />);
    const electricPokemonFilter = getByRole('button', { name: 'Electric' });
    const nextPokemonBtn = getByRole('button', { name: 'Próximo pokémon' });
    expect(electricPokemonFilter).toBeInTheDocument();
    expect(nextPokemonBtn).toBeInTheDocument();

    fireEvent.click(electricPokemonFilter);
    expect(nextPokemonBtn.disabled).toBe(true);

    const moreDetailsBtn = getByText(moreDetails);
    expect(moreDetailsBtn).toBeInTheDocument();

    fireEvent.click(moreDetailsBtn);
    const { pathname } = history.location;
    const { id, name, foundAt } = pokemon;
    expect(pathname).toBe(`/pokemons/${id}`);

    expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();

    const allPokemonsLocations = getAllByAltText(`${name} location`);
    allPokemonsLocations.forEach((location, index) => {
      expect(location.src).toBe(foundAt[index].map);
      expect(location.alt).toBe(`${name} location`);
    });
  });

  it('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const moreDetailsBtn = getByText(moreDetails);
    fireEvent.click(moreDetailsBtn);
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    const starIcon = getByAltText(`${pokemon.name} is marked as favorite`);

    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
