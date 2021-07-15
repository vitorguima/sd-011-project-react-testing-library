import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('tests PokemonDetails component', () => {
  const mewPokemom = '/pokemons/151';
  const mewLocation = 'Mew location';

  test('Test selected Pokémons information screen', () => {
    const { getByText, queryByText, history } = renderWithRouter(<App />);
    history.push(mewPokemom);

    const name = getByText('Mew Details');
    const moreDetails = queryByText('More Details');

    expect(name).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
  });

  test('Test page contains a heading Summary', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    history.push(mewPokemom);

    const title = getByRole('heading', { level: 2, name: 'Summary' });
    expect(title).toBeInTheDocument();

    const resumo = getByText(/those people who are pure of heart/i);
    expect(resumo).toBeInTheDocument();
  });

  test('Tests section with maps and pokémon location', () => {
    const { history, getByAltText, getByRole, getByText } = renderWithRouter(<App />);
    history.push(mewPokemom);

    const title = getByRole('heading', { level: 2, name: 'Game Locations of Mew' });
    expect(title).toBeInTheDocument();

    const resumo = getByAltText(mewLocation);
    expect(resumo).toBeInTheDocument();

    const local = getByText('Faraway Island');
    expect(local).toBeInTheDocument();
  });

  test('Test section with maps containing the locations', () => {
    const { history, getByAltText } = renderWithRouter(<App />);
    history.push(mewPokemom);

    const img = getByAltText(mewLocation);
    expect(img)
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png');
    expect(img)
      .toHaveAttribute('alt', mewLocation);
  });

  test('Test if the user can bookmark a pokemon through the details page', () => {
    const { history, getByRole, getByAltText } = renderWithRouter(<App />);
    history.push(mewPokemom);

    const favorite = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favorite);

    const star = getByAltText('Mew is marked as favorite');
    expect(star)
      .toHaveAttribute('src', '/star-icon.svg');
    expect(star)
      .toHaveAttribute('alt', 'Mew is marked as favorite');
  });
});
