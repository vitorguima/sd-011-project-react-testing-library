import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const { type, name, image, averageWeight: { value, measurementUnit }, id } = pokemons[7];

describe('Requisito 6', () => {
  it('renderiza o pokemon card com nome, tipo, peso e imagem', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const buttonNormal = getByRole('button', { name: type });
    fireEvent.click(buttonNormal);
    expect(getByTestId('pokemon-name').textContent).toBe(name);
    expect(getByTestId('pokemon-type').textContent).toBe(type);
    expect(getByTestId('pokemon-weight')
      .textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(getByRole('img').src).toBe(image);
    expect(getByRole('img').alt).toBe(`${name} sprite`);
  });

  it('renderiza link pra pagina de mais detalhes', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const buttonNormal = getByRole('button', { name: type });
    const moreDetails = getByText('More details');
    fireEvent.click(buttonNormal);
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails.href).toContain(`/pokemons/${id}`);
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/143');
  });

  it('renderiza uma estrela quando o pokemon é favoritado', () => {
    const {
      getByRole,
      getByText,
      getByAltText,
      getByLabelText,
    } = renderWithRouter(<App />);
    const buttonNormal = getByRole('button', { name: type });
    const moreDetails = getByText('More details');
    fireEvent.click(buttonNormal);
    fireEvent.click(moreDetails);
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    const iconFavorite = getByAltText(`${name} is marked as favorite`);
    expect(iconFavorite).toBeInTheDocument();
    expect(iconFavorite.src).toContain('/star-icon.svg');
  });
});
