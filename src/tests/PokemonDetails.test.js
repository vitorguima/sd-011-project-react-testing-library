import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Verifica se tem o Summary renderizado', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText('More details');
  fireEvent.click(details);
  const getAbout = container.querySelectorAll('h2')[1];
  expect(getAbout.textContent).toBe('Summary');
});

test('Verifica se tem o Game Locations of<Name> renderizado', () => {
  const { getByText, container } = renderWithRouter(<App />);
  const details = getByText('More details');
  fireEvent.click(details);
  const getAbout = container.querySelectorAll('h2')[2];
  expect(getAbout.textContent).toBe('Game Locations of Pikachu');
});
