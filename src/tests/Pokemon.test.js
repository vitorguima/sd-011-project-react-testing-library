import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('render pokemons\'s card properly', () => {
  it('render pokemon\'s card with name, type, weight and image', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    userEvent.click(getByRole('button', { name: 'Electric' }));
    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];
    expect(getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(getByTestId('pokemon-weight')).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(getByRole('img')).toHaveAttribute('alt', `${name} sprite`);
    expect(getByRole('img')).toHaveAttribute('src', image);
  });

  it('renders a link to the detail page', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const { type, id } = pokemons[0];

    userEvent.click(getByRole('button', { name: type }));
    const moreDetailsLink = getByText('More details');
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('renders a star icon when the pokemon is favorited', () => {
    const { getByRole, getByText, getByAltText } = renderWithRouter(<App />);

    userEvent.click(getByRole('button', { name: 'Electric' }));
    userEvent.click(getByText('More details'));
    userEvent.click(getByRole('checkbox', { id: 'favorite' }));

    const { name } = pokemons[0];
    const favoriteImg = getByAltText(`${name} is marked as favorite`);
    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
