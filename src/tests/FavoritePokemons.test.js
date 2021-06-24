import { fireEvent, getByText } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import RenderWithRouter from '../components/RenderWithRouter';

describe('testa os elementos da aplicação Favorites Pokémons', () => {
  it('mensagem no favorite pokemon found', () => {
    RenderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const noMatch = getByText(/No favorite pokemon found/i);
    expect(noMatch).toBeInTheDocument();
  });
  it('e exibido todos os cards favoritados', () => {
    const { container } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/Próximo pokémon/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(container.querySelectorAll('.favorite-pokemon')).toHaveLength(2);
  });
});
