import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

const pokemon = {
  id: 143,
  name: 'Snorlax',
  type: 'Normal',
  averageWeight: {
    value: '460.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Vermillion City',
      map: 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
    },
  ],
  summary: 'What sounds like...',
};

const pokemonComponent = <Pokemon pokemon={ pokemon } isFavorite={ false } />;

describe('Teste componente <Pokemon.js />', () => {
  it('Renderiza um card com as informações de determinado pokémon.', () => {
    const { getByRole, getByTestId } = renderWithRouter(pokemonComponent);
    const snorlaxName = getByTestId('pokemon-name');
    expect(snorlaxName.innerHTML).toBe('Snorlax');
    const snorlaxType = getByTestId('pokemon-type');
    expect(snorlaxType.innerHTML).toBe('Normal');
    const snorlaxWeight = getByTestId('pokemon-weight');
    expect(snorlaxWeight.innerHTML).toBe('Average weight: 460.0 kg');
    const image = getByRole('img', { name: 'Snorlax sprite' });
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
  });

  it('Contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { getByRole, getByText, getByLabelText } = renderWithRouter(<App />);
    const link = getByRole('link', { name: 'More details' });
    expect(link.href).toContain('/pokemons/25');

    fireEvent.click(link);
    const gameLocations = getByText(/Game Locations of Pikachu/);
    expect(gameLocations).toBeInTheDocument();
    const btnFavorite = getByLabelText('Pokémon favoritado?', { selector: 'input ' });

    fireEvent.click(btnFavorite);
    const star = getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star.src).toContain('/star-icon.svg');
    expect(star).toBeInTheDocument();
  });
});
