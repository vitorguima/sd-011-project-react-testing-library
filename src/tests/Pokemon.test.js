import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('6 - Testa o componente <Pokemon.js />', () => {
  const pikachu = data[0];
  const { id, name, type, image, averageWeight: { value, measurementUnit } } = pikachu;
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText, getAllByText, getByRole } = renderWithRouter(<App />);
    expect(getByText(name)).toBeInTheDocument();
    expect(getAllByText(type)[0]).toBeInTheDocument();
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();

    const pokemonImage = getByRole('img', { name: `${name} sprite` });
    expect(pokemonImage).toHaveAttribute('src', image);
    expect(pokemonImage.alt).toContain(`${name} sprite`);
  });

  it('Testa se o link do card do Pokemon possui a URL /pokemons/<id>', () => {
    const { getByRole } = renderWithRouter(<App />);
    const showDetailsBtn = getByRole('link', { name: 'More details' });
    expect(showDetailsBtn).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('Testa se ao clicar no link de navegação do Pokemon, é redirecionado para detalhes',
    () => {
      const { getByRole, history } = renderWithRouter(<App />);
      const showDetailsBtn = getByRole('link', { name: /More details/i });
      fireEvent.click(showDetailsBtn);
      expect(history.location.pathname).toBe(`/pokemons/${id}`);
    });

  it('A imagem deve ter o atributo alt igual a `<pokemon> is marked as favorite`', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const showDetailsBtn = getByRole('link', { name: /More details/i });
    fireEvent.click(showDetailsBtn);
    const testPkmType = getByTestId(/pokemon-type/i);
    expect(testPkmType.innerHTML).toBe('Electric');
    const checked = getByRole('checkbox');
    fireEvent.click(checked);
    const favoritePkm = getByRole('img', { name: `${name} is marked as favorite` });
    expect(favoritePkm).toHaveAttribute('src', '/star-icon.svg');
  });
});
