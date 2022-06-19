import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('06 - Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de um pokemon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImage = screen.getByAltText(/sprite/);

    expect(pokeName).toHaveTextContent(/Pikachu/);
    expect(pokeType).toHaveTextContent(/eletric/);
    expect(pokeWeight).toHaveTextContent(/Average weight: 6.0 kg/);
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
