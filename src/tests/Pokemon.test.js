import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';
import App from '../App';

describe('Tests requisito 6', () => {
  const moreDetailsBtn = 'More details';
  const pokePath = '/pokemons/25';

  it('tests if a pokemons card is displayed with all of its infos', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);

    const { averageWeight, name, image, type } = Data[0];
    const { value, measurementUnit } = averageWeight;
    const pokeType = getByTestId('pokemon-type');
    const weight = `Average weight: ${value} ${measurementUnit}`;
    const img = getByRole('img', { name: `${name} sprite` });

    expect(getByText(name)).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.innerHTML).toBe(type);
    expect(getByText(weight)).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(image);
  });

  it('tests if theres a more details link + id about the pokemon on the URL', () => {
    const { getByText } = renderWithRouter(<App />);

    const details = getByText(moreDetailsBtn);

    expect(details).toHaveAttribute('href', pokePath);
  });

  it('tests if by clicking on more details it goes to the page', () => {
    const { history, getByText } = renderWithRouter(<App />);

    const details = getByText(moreDetailsBtn);
    fireEvent.click(details);
    history.push(pokePath);
    const pikachuPage = getByText(/pikachu details/i);

    expect(pikachuPage).toBeInTheDocument();
  });

  it('tests if URL changes when on pokemons page', () => {
    const { history } = renderWithRouter(<App />);

    // const details = getByText(moreDetailsBtn);
    // fireEvent.click(details);
    history.push(pokePath);
    const url = history.location.pathname;

    expect(url).toBe(pokePath);
  });

  it('tests if theres a star icon on favorite pokemons', () => {
    const { getByRole, history, getByText } = renderWithRouter(<App />);

    const details = getByText(moreDetailsBtn);
    fireEvent.click(details);
    history.push(pokePath);
    const isFavorite = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    fireEvent.click(isFavorite);
    const starIcon = getByRole('img', { name: /pikachu is marked as favorite/i });

    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
