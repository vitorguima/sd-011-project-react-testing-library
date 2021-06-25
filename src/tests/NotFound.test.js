import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test if Not Found page is being exhibited correctly', () => {
  test('checks for text on Not Found Page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const wrongRoute = '/noroute';
    history.push(wrongRoute);
    const errorText = getByText('Page requested not found');
    expect(errorText).toBeInTheDocument();
  });

  test('checks for image on Not Found Page', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    const wrongRoute = '/noroute';
    history.push(wrongRoute);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageSrc = getByAltText('Pikachu crying because the'
    + ' page requested was not found');
    expect(imageSrc.src).toContain(imgUrl);
  });
});
