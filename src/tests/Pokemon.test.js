import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste do component Pokemon.js', () => {
  test('Teste se renderiza um card com as informações de determinado pokémon.', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    userEvent.click(getByRole('button', { name: 'Electric' }));
    const { name, type, averageWeight: { measurementUnit, value }, image } = pokemons[0];
    expect(getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(getByTestId('pokemon-weight')).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(getByRole('img')).toHaveAttribute('alt', `${name} sprite`);
    expect(getByRole('img')).toHaveAttribute('src', image);
  });
  test('renderiza um link para a página de detalhes', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const { type, id } = pokemons[0];

    userEvent.click(getByRole('button', { name: type }));
    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  test('renderiza um ícone de estrela quando o Pokémon é favorito', () => {
    const { getByRole, getByText, getByAltText } = renderWithRouter(<App />);

    userEvent.click(getByRole('button', { name: 'Electric' }));
    userEvent.click(getByText('More details'));
    userEvent.click(getByRole('checkbox', { id: 'favorite' }));

    const { name } = pokemons[0];
    const imageFavorite = getByAltText(`${name} is marked as favorite`);
    expect(imageFavorite).toBeInTheDocument();
    expect(imageFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
