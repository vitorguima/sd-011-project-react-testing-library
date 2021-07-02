import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('About tests', () => {
  it('contains heading with text `About Pokédex`', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByRole('link', { name: 'About' }));
    const heading = getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('About Pokédex');
  });

  it('contains 2 paragraphs with pokédex info`s', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByRole('link', { name: 'About' }));

    expect(getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
    expect(getByText(/ a digital encyclopedia/i)).toBeInTheDocument();
    expect(getByText(/ containing all Pokémons/i)).toBeInTheDocument();
    expect(getByText(/One can filter Pokémons by type,/i)).toBeInTheDocument();
    expect(getByText(/ and see more details for each one of them/i)).toBeInTheDocument();
  });

  it('', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByRole('link', { name: 'About' }));
    const image = getByRole('img');
    const imageSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(imageSource);
  });
});
