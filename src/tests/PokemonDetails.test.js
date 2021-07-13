import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('informações detalhadas mostradas na tela.', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/i);
  fireEvent.click(moreDetails);
  const details = getByText('Pikachu Details');
  const sumary = getByText('Summary');
  const h2 = getByRole('heading', {
    name: /Summary/i,
  });
  const detai = getByText(/This intelligent Pokémon roasts hard berries/i);

  expect(sumary).toBeInTheDocument();
  expect(h2).toBeInTheDocument();
  expect(moreDetails).not.toBeInTheDocument();
  expect(details).toBeInTheDocument();
  expect(detai).toBeInTheDocument();
});

test('mapas contendo as localizações do pokémon', () => {
  const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
  const detalhes = getByText(/More details/i);
  fireEvent.click(detalhes);
  const h2 = getByRole('heading', {
    name: /Game Locations of Pikachu/i,
  });
  const localiza = getByText('Kanto Viridian Forest');
  const localiza2 = getByText('Kanto Power Plant');
  const imagens = getAllByRole('img', { name: /Pikachu location/i });

  // console.log(imagens.length);
  expect(imagens.length).toBe(2);
  expect(imagens[0].src).not.toBe('');
  expect(imagens[1].src).not.toBe('');
  expect(imagens[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(imagens[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(imagens[1].alt).not.toBe('');
  expect(imagens[1].alt).toBe('Pikachu location');
  expect(imagens[1].alt).toBe('Pikachu location');
  expect(imagens[1].alt).not.toBe('');
  expect(localiza2).toBeInTheDocument('Kanto Power Plant');
  expect(localiza).toBeInTheDocument('Kanto Viridian Forest');
  expect(h2.innerHTML).toContain('Game Locations of Pikachu');
});

test('favoritar um pokémon através da página de detalhes.', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);
  // matcher getByAltText para pegar o valor do atributo alt da imagem
  const detalhes = getByText(/More details/i);
  fireEvent.click(detalhes);
  const favoritado = getByText(/Pokémon favoritado?/i);
  fireEvent.click(favoritado);
  const label = getByAltText(/is marked as favorite/i);
  // console.log(label);
  // como clickei agora existe a imagem e a tag
  expect(label).toBeInTheDocument();
  fireEvent.click(favoritado); // clicou novamente,çlog não ta favoritado
  expect(label).not.toBeInTheDocument(); // tenta 3
});
