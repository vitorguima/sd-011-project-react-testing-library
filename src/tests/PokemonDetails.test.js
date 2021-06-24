import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

const { name, summary, foundAt } = Data[7];
const rota = '/pokemons/143';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Testa que informações do pokemon está sendo mostrada na tela', () => {
    const {
      getAllByRole,
      queryByText,
      history,
    } = renderWithRouter(<App />);
    history.push(`${rota}`);
    const headings = getAllByRole('heading', { level: 2 });

    expect(headings[0].textContent).toBe(`${name} Details`);
    expect(queryByText('More details')).not.toBeInTheDocument();
    expect(headings[1].textContent).toBe('Summary');
    expect(headings[1].nextElementSibling.textContent).toBe(summary);
  });

  test('Testa se existe uma seção com os mapas contendo a localização do pokémon', () => {
    const {
      getAllByRole,
      getByText,
      getAllByAltText,
      history,
    } = renderWithRouter(<App />);
    history.push(`${rota}`);
    const headings = getAllByRole('heading', { level: 2 });
    const locationImages = getAllByAltText(`${name} location`).map((e) => e.src); // Pega as imagens e volta apenas o texto do src;
    expect(headings[2].textContent).toBe(`Game Locations of ${name}`);
    foundAt.forEach(({ location, map }) => {
      expect(getByText(location)).toBeInTheDocument();
      expect(locationImages).toContain(map);
    });
  });

  test('Testa se pode-se favoritar um pokémon da página de detalhes', () => {
    const {
      getByRole,
      getByLabelText,
      history,
    } = renderWithRouter(<App />);
    history.push(`${rota}`);
    const favoriteCheckbox = getByRole('checkbox', { id: 'favorite' });
    expect(favoriteCheckbox).toBeInTheDocument();
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    fireEvent.click(favoriteCheckbox);
  });
});
