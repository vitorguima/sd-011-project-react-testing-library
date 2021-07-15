import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2Home = getByRole('heading', { level: 2 });
    expect(h2Home).toBeInTheDocument();
    expect(h2Home).toHaveTextContent(/Encountered pokémons/i);
  });
  it('Teste se é exibido o próximo Pokémon quando "Próximo pokémon" é clicado', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPok = getByText(/Próximo Pokémon/i);
    expect(nextPok).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const allBtn = getByText(/All/i);
    expect(allBtn).toBeInTheDocument();
    fireEvent.click(allBtn);
  });
  it('Teste se aparece um botão para filtrar cada tipo de Pokémon', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);
    const pkTypeBtn = getAllByTestId('pokemon-type-button');
    const typeOfPoks = 7;

    const allButton = getByRole('button', { name: 'All' });
    const fire = getByRole('button', { name: 'Fire' });
    const electric = getByRole('button', { name: 'Electric' });
    const poison = getByRole('button', { name: 'Poison' });
    const psychic = getByRole('button', { name: 'Psychic' });
    const dragon = getByRole('button', { name: 'Dragon' });
    const normal = getByRole('button', { name: 'Normal' });
    const bug = getByRole('button', { name: 'Bug' });

    expect(pkTypeBtn).toHaveLength(typeOfPoks);
    expect(allButton).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(electric).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
  });
});
