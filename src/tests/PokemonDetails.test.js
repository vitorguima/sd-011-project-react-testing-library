import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

const moreDetails = 'More details';

describe('Teste componente <PokemonDetails.js />', () => {
  it('Renderiza detalhes do Pokémon selecionado.', () => {
    const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);
    const link = getByRole('link', { name: moreDetails });
    fireEvent.click(link);

    const pokemonName = getByTestId('pokemon-name').innerHTML;
    const title = `${pokemonName} Details`;
    const headingDetails = getByRole('heading', { name: title, level: 2 });
    expect(headingDetails).toBeInTheDocument();

    const headingSummary = getByRole('heading', { name: 'Summary', level: 2 });
    expect(headingSummary).toBeInTheDocument();

    const paragraphPokemon = data[0].summary;
    const summary = getByText(paragraphPokemon);
    expect(summary).toBeInTheDocument();
  });

  it('Contém uma seção com os mapas contendo as localizações do pokémon.', () => {
    const { getByRole, getAllByRole, getByText } = renderWithRouter(<App />);
    const link = getByRole('link', { name: moreDetails });
    fireEvent.click(link);

    const gameLocations = `Game Locations of ${data[0].name}`;
    const heading = getByRole('heading', { name: gameLocations, level: 2 });
    expect(heading).toBeInTheDocument();

    const maps = getAllByRole('img', { name: `${data[0].name} location` });
    expect(maps.length).toBe(2);
    expect(maps[0].src).toContain(data[0].foundAt[0].map);

    const mapKanto = getByText(data[0].foundAt[0].location);
    expect(mapKanto).toBeInTheDocument();
  });

  it('Favorita um pokémon através da página de detalhes.', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);
    const link = getByRole('link', { name: moreDetails });
    fireEvent.click(link);

    const btnFavorite = getByLabelText('Pokémon favoritado?', { selector: 'input ' });

    fireEvent.click(btnFavorite);
    const star = getByRole('img', { name: `${data[0].name} is marked as favorite` });
    expect(star).toBeInTheDocument();

    fireEvent.click(btnFavorite);
    expect(btnFavorite.checked).toBe(false);
    fireEvent.click(btnFavorite);
    expect(btnFavorite.checked).toBe(true);
  });
});
