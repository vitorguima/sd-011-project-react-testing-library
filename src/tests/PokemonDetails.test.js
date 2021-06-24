import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const { name, summary, foundAt } = pokemons[7];
const rota = '/pokemons/143';

describe('Requisito 7', () => {
  it('informações detalhadas do pokemon estão sendo demonstradas na tela', () => {
    const {
      getAllByRole,
      queryByText,
    } = renderWithRouter(<App />, { route: rota });
    const headings = getAllByRole('heading', { level: 2 });
    expect(headings[0].textContent).toBe(`${name} Details`);
    expect(queryByText('More details')).not.toBeInTheDocument();
    expect(headings[1].textContent).toBe('Summary');
    expect(headings[1].nextElementSibling.textContent).toBe(summary);
  });

  it('existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const {
      getAllByRole,
      getByText,
      getAllByAltText,
    } = renderWithRouter(<App />, { route: rota });
    const headings = getAllByRole('heading', { level: 2 });
    const locationImages = getAllByAltText(`${name} location`).map((e) => e.src);
    console.log(locationImages);
    expect(headings[2].textContent).toBe(`Game Locations of ${name}`);
    foundAt.forEach(({ location, map }) => {
      expect(getByText(location)).toBeInTheDocument();
      expect(locationImages).toContain(map);
    });
  });

  it('o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const {
      getByRole,
      getByLabelText,
    } = renderWithRouter(<App />, { route: rota });
    const favoriteCheck = getByRole('checkbox', { id: 'favorite' });
    expect(favoriteCheck).toBeInTheDocument();
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    fireEvent.click(favoriteCheck);
  });
});
