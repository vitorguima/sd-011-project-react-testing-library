import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const { type, name, image, averageWeight: { value, measurementUnit }, id } = pokemons[7];

describe('Testa o componente <Pokemon.js />', () => {
  it('se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: type }));
    expect(getByTestId('pokemon-name').textContent).toBe(name);
    expect(getByTestId('pokemon-type').textContent).toBe(type);
    expect(getByTestId('pokemon-weight').textContent)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(getByRole('img').src).toBe(image);
    expect(getByRole('img').alt).toBe(`${name} sprite`);
  });

  it('renderiza link pra pagina de mais detalhes', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: type }));
    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails.href).toContain(`/pokemons/${id}`);
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/143');
  });

  it('se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByRole, getByText, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByRole('button', { name: type }));
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    const iconFavorite = getByAltText(`${name} is marked as favorite`);
    expect(iconFavorite).toBeInTheDocument();
    expect(iconFavorite.src).toContain('/star-icon.svg');
  });
});
