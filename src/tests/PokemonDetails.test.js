import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('7 - Testa o componente <PokemonDetails.js />', () => {
  const pikachu = data[0];
  const { id, name, summary, foundAt } = pikachu;
  it('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      const { getByText, queryByRole } = renderWithRouter(<App />);
      const detailBtn = queryByRole('link', { name: /More details/i });
      fireEvent.click(detailBtn);
      const text = getByText(`${name} Details`);
      expect(text).toBeInTheDocument();
      expect(detailBtn).not.toBeInTheDocument();
      expect(queryByRole('heading', { level: 2, name: /Summary/i })).toBeInTheDocument();
      expect(getByText(summary)).toBeInTheDocument();
    });

  it('Testa se existe na página uma seção com os mapas contendo localizações do pokémon',
    () => {
      const { queryAllByRole, queryByRole, getAllByRole } = renderWithRouter(<App />);
      const detailBtn = queryByRole('link', { name: /More details/i });
      fireEvent.click(detailBtn);
      expect(queryByRole('heading', { level: 2, name: `Game Locations of ${name}` }))
        .toBeInTheDocument();
      const allLocationDetails = queryAllByRole('img', { name: `${name} location` });
      expect(allLocationDetails.length).toBe(foundAt.length);
      const pkmLocation = getAllByRole('img', { name: `${name} location` });
      expect(pkmLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    });

  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const { getByRole, queryByRole, getByText } = renderWithRouter(<App />);
      const detailBtn = queryByRole('link', { name: /More details/i });
      fireEvent.click(detailBtn);
      const favoriteBtn = getByRole('checkbox');
      fireEvent.change(favoriteBtn, { target: { checked: !favoriteBtn.checked } });
      fireEvent.click(favoriteBtn);
      fireEvent.change(favoriteBtn, { target: { checked: favoriteBtn.checked } });
      expect(getByText('Pokémon favoritado?')).toBeInTheDocument();
    });
});
