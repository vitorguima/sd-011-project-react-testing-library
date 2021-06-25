import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const moreDetails = 'More details';

describe('Teste componente <PokemonDetails.js />', () => {
  it('Renderiza detalhes do Pokémon selecionado.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const link = getByRole('link', { name: moreDetails });
    fireEvent.click(link);

    const title = getByText(/Pikachu Details/);
    expect(title).toBeInTheDocument();

    const heading = getByRole('heading', { name: 'Summary', level: 2 });
    expect(heading).toBeInTheDocument();

    const paragraph = (/This intelligent Pokémon roasts hard berries/);
    const summary = getByText(paragraph);
    expect(summary).toBeInTheDocument();
  });

  it('Contém uma seção com os mapas contendo as localizações do pokémon.', () => {
    const { getByRole, getAllByRole, getByText } = renderWithRouter(<App />);
    const link = getByRole('link', { name: moreDetails });
    fireEvent.click(link);

    const heading = getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    expect(heading).toBeInTheDocument();

    const maps = getAllByRole('img', { name: 'Pikachu location' });
    expect(maps.length).toBe(2);
    expect(maps[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    const mapKanto = getByText(/Kanto Viridian Forest/);
    expect(mapKanto).toBeInTheDocument();
  });

  it('Favorita um pokémon através da página de detalhes.', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);
    const link = getByRole('link', { name: moreDetails });
    fireEvent.click(link);

    const btnFavorite = getByLabelText('Pokémon favoritado?', { selector: 'input ' });

    fireEvent.click(btnFavorite);
    const star = getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star).toBeInTheDocument();

    fireEvent.click(btnFavorite);
    expect(btnFavorite.checked).toBe(false);
    fireEvent.click(btnFavorite);
    expect(btnFavorite.checked).toBe(true);
  });
});
