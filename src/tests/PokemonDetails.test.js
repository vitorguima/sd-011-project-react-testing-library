import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const moreDetailsString = 'More details';

test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
  () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(moreDetailsString));
    expect(getByText('Pikachu Details')).toBeTruthy();
    const h2Summary = getByRole('heading', { level: 2, name: /Summary/ });
    expect(h2Summary).toBeInTheDocument();
    const pSummary1 = 'This intelligent Pokémon roasts hard berries ';
    const pSummary2 = 'with electricity to make them tender enough to eat.';
    expect(getByText(pSummary1 + pSummary2)).toBeInTheDocument();
  });

test(
  'Teste se existe na página uma seção com os mapas contendo as localizações do pokémon.',
  () => {
    const { getByText, getByRole, container } = renderWithRouter(<App />);
    fireEvent.click(getByText(moreDetailsString));
    expect(getByText('Pikachu Details')).toBeTruthy();
    const h2Locations = getByRole('heading',
      { level: 2, name: /Game Locations of Pikachu/ });
    expect(h2Locations).toBeInTheDocument();
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(getByText('Kanto Power Plant')).toBeInTheDocument();
    const locationImgs = container.querySelectorAll('img');
    expect(locationImgs[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImgs[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationImgs[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(locationImgs[2]).toHaveAttribute('alt', 'Pikachu location');
  },
);

test('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
  const { getByText, container } = renderWithRouter(<App />);
  fireEvent.click(getByText(moreDetailsString));
  const pokeFavoriteCheckBox = container.querySelector('#favorite');
  expect(pokeFavoriteCheckBox).toBeInTheDocument();
  expect(getByText('Pokémon favoritado?')).toBeInTheDocument();
});
