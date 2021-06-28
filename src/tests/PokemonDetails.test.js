import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

const mDetailt = 'More details';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas são mostradas na tela', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(mDetailt));
    expect(getByText(/Details/).textContent).toContain('Pikachu');
    expect(getByText('Summary')).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(mDetailt));
    expect(getByText(/Game Locations of /).textContent).toContain('Pikachu');
    expect(getAllByAltText(/location/)[0].alt).toContain('Pikachu');
    expect(getAllByAltText(/location/)[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações', () => {
    const { getByText, container } = renderWithRouter(<App />);
    fireEvent.click(getByText(mDetailt));
    const btn = container.querySelector('#favorite');
    expect(getByText('Pokémon favoritado?')).toBeInTheDocument();
    expect(btn.type).toBe('checkbox');
    const section = container.querySelectorAll('section');
    const valueText = section[1].childNodes[1].textContent;
    expect(getByText(valueText)).toBeInTheDocument();
  });
});
