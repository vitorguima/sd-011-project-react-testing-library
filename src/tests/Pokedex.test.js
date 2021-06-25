import React from 'react';
/* import { MemoryRouter } from 'react-router-dom'; */
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../Renderwithrouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  it('Testa se a página contém o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });

    expect(heading.innerHTML).toBe('Encountered pokémons');
  });

  it('Testa o button próximo pokemon', () => {
    const { getByRole, queryByText } = renderWithRouter(<App />);
    const btn = getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(btn);
    expect(queryByText('Charmander')).toBeInTheDocument();

    const numberOfClicks = 8;
    for (let index = 0; index < numberOfClicks; index += 1) {
      fireEvent.click(btn);
    }
    expect(queryByText('Pikachu')).toBeInTheDocument();
  });

  it('Testa se somente 1 pokemon é exibido por vez', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const kg = getAllByText(/Average weight/i);

    expect(kg.length).toBe(1);
  });
});
