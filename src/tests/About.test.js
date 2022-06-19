import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../pages/About';

describe('02 - Teste o componente <About.js />', () => {
  it('Teste se a página contém um heading', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/ });

    expect(aboutTitle).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen
      .getByText(/This application simulates a/);
    const secondParagraph = screen
      .getByText(/One can filter Pokémons by type, and see more details for each one of/);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('Teste se a página contém uma imagem', () => {
    renderWithRouter(<About />);

    const pokedexImage = screen.getByAltText(/Pokédex/);

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
