import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound';

describe('04 - Teste o componente <NotFound.js />', () => {
  it('Teste se a pagina contém um título', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading', {
      name: /Page requested not found/ });

    expect(notFoundTitle).toBeInTheDocument();
  });
  it('Teste se a página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);

    const pokedexImage = screen.getByAltText(/Pikachu crying because the page requested/);

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
