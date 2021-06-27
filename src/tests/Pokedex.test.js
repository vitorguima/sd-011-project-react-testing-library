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

  it('Testa se o tipo de pokemon corresponde ao pokemon encontrado', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const typeFire = getByRole('button', { name: /Fire/i });
    fireEvent.click(typeFire);
    const nextPokFire = getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(nextPokFire);
    const firePok = getByText(/Rapidash/i);

    expect(firePok).toBeInTheDocument();

    const typePsychic = getByRole('button', { name: /Psychic/i });
    fireEvent.click(typePsychic);
    const nextPokPsychic = getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(nextPokPsychic);
    const psychicPok = getByText(/Mew/i);

    expect(psychicPok).toBeInTheDocument();
  });

  it('Testa o filtro All', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const pika = getByText(/Pikachu/i);
    expect(pika).toBeInTheDocument();

    const all = getByRole('button', { name: /All/i });
    fireEvent.click(all);
    const nextPoke = getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(nextPoke);
    const charmander = getByText(/Charmander/i);

    expect(charmander).toBeInTheDocument();
  });

  it('Testa se existem todos botões de tipo', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typebutton = getAllByTestId('pokemon-type-button');
    const types = 7;

    expect(typebutton.length).toBe(types);
  });

  it('Testa se o botão próximo pokemon é habilitado como deveria', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const normalType = getByRole('button', { name: /Normal/i });
    fireEvent.click(normalType);
    const snorlax = getByText(/Snorlax/i);
    const nextBtn = getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(nextBtn);

    expect(snorlax).toBeInTheDocument();
  });
});
