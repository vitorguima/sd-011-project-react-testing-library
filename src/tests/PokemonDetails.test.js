import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';
import App from '../App';

const moreDetailsText = 'More details';
describe('Renders detailed information about the pokemon', () => {
  it('renders title and summary', () => {
    const { getAllByRole, getByRole, queryByText } = renderWithRouter(<App />);
    const { name, summary } = pokemons[0];
    userEvent.click(getByRole('link', { name: moreDetailsText }));

    const headings = getAllByRole('heading', { level: 2 });

    expect(headings[0]).toHaveTextContent(`${name} Details`);
    expect(headings[1]).toHaveTextContent('Summary');
    expect(headings[1].nextSibling).toHaveTextContent(summary);
    expect(queryByText(moreDetailsText)).toBeNull();
  });

  it('renders a section with maps and pokemon\'s location', () => {
    const {
      getByText, getAllByRole, getByRole, getAllByAltText,
    } = renderWithRouter(<App />);
    const { name, foundAt } = pokemons[0];
    userEvent.click(getByRole('link', { name: moreDetailsText }));

    const headings = getAllByRole('heading', { level: 2 });
    expect(headings[2]).toHaveTextContent(`Game Locations of ${name}`);

    const locations = getAllByAltText(`${name} location`);
    expect(locations.length).toBe(foundAt.length);

    foundAt.forEach(({ location, map }, index) => {
      expect(getByText(location)).toBeInTheDocument();
      expect(locations[index]).toHaveAttribute('src', map);
    });
  });

  it('renders a checkbox that allows user to add a pokemon as a favorite', () => {
    const { getByText, getByAltText, getByRole, queryByText } = renderWithRouter(<App />);
    const { name } = pokemons[0];

    userEvent.click(getByText('More details'));

    const favoriteBtn = getByRole('checkbox', { id: 'favorite' });
    expect(favoriteBtn.parentElement).toHaveTextContent('Pokémon favoritado?');
    expect(favoriteBtn).toBeInTheDocument();

    userEvent.click(favoriteBtn);

    const favoriteImg = getByAltText(`${name} is marked as favorite`);
    expect(favoriteImg).toBeInTheDocument();

    userEvent.click(favoriteBtn);

    expect(queryByText(`${name} is marked as favorite`)).toBeNull();
  });
});

// Source: consulta ao repositório https://github.com/tryber/sd-011-project-react-testing-library/pull/166/
