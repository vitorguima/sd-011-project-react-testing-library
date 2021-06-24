import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Check the behavior of the About page', () => {
  it('', () => {
    const { getByText, getByAltText } = render(<About />);

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const title = getByText(/About Pokédex/);
    const image = getByAltText(/Pokédex/);

    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe('About Pokédex');
    expect(image).toHaveAttribute('src', url);
  });
});

// Como verificar um elemento pelo seu atributo (como o 'src' da tag <img>) :
//    https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
// Consulta atributos jest-dom:
//    https://github.com/testing-library/jest-dom#tohaveattribute
