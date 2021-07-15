import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testando componentes cards de pokemon', () => {
  const pok = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon...',
  };
  it('testando se as informações do pok são renderizadas', () => {
    const { getByText, getByTestId, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const name = getByText(/Pikachu/i);
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight').innerHTML;
    const image = getByRole('img');
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const peso = `${pok.averageWeight.value} ${pok.averageWeight.measurementUnit}`;
    expect(name.textContent).toMatch(pok.name);
    expect(type.textContent).toMatch(pok.type);
    expect(weight).toMatch(`Average weight: ${peso}`);
    expect(image.src).toContain(pok.image);
    expect(image.alt).toContain('Pikachu sprite');
  });

  it('testa link de navegação', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const poisonBtn = getByRole('button', { name: /poison/i });
    fireEvent.click(poisonBtn);
    const link = getByRole('link', { name: /More details/i });
    fireEvent.click(link);
    const URL = '/pokemons/23';
    expect(history.location.pathname).toBe(URL);
  });
  it('Teste se existe um ícone de estrela', () => {
    const { getAllByRole, getByRole } = renderWithRouter(<App />);
    const poisonBtn = getByRole('button', { name: /poison/i });
    fireEvent.click(poisonBtn);
    const link = getByRole('link', { name: /More details/i });
    fireEvent.click(link);
    const favorites = getByRole('checkbox');
    fireEvent.click(favorites);
    const image = getAllByRole('img');
    expect(image[1].src).toContain('star-icon.svg');
    expect(image[1].alt).toContain('Ekans is marked as favorite');
  });
});
