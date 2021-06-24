import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// it('', () => {});

it('Testa se as informações detalhadas do Pokémon são mostradas na tela.', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const buttonDragon = getByText(/Dragon/);
  fireEvent.click(buttonDragon);
  const buttonDetail = getByText('More details');
  fireEvent.click(buttonDetail);
  const nameDetail = getByText('Dragonair Details');
  expect(nameDetail).toBeInTheDocument();
  const titleH2 = container.querySelectorAll('h2')[1];
  expect(titleH2).toHaveTextContent(/Summary/);
  const dragonairText = 'They say that if it emits an aura';
  const sectionP = container.querySelectorAll('p')[3];
  expect(sectionP).toHaveTextContent(dragonairText);
});

it('Testa se existe uma seção com os mapas com as localizações do pokémon', () => {
  const { history, getByText, getAllByAltText } = renderWithRouter(<App />);
  history.push('/pokemons/148');
  const dragonairLocations = getByText('Game Locations of Dragonair');
  expect(dragonairLocations).toBeInTheDocument();
  const locations = getAllByAltText('Dragonair location');
  expect(locations.length).toBe(2);
  expect(locations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png');
  expect(locations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png');
});

it('Teste se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
  const { getByRole, getByLabelText, getByAltText, history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  const labelFav = getByLabelText('Pokémon favoritado?');
  fireEvent.click(labelFav);
  history.push('/');
  const star = getByAltText('Pikachu is marked as favorite');
  expect(star).toBeInTheDocument();
  history.push('/pokemons/25');
  fireEvent.click(labelFav);
  expect(star).not.toBeInTheDocument();
});
