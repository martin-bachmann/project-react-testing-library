import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('07 - Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas são renderizadas', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/ });
    userEvent.click(moreDetails);

    const pokeDetailsTitle = screen.getByRole('heading', { name: /Details/ });
    const summaryTitle = screen.getByRole('heading', { name: /Summary/ });
    const summaryParagraph = screen.getByText(pokemons[0].summary);

    expect(pokeDetailsTitle).toBeInTheDocument();
    // expect(screen.getByRole('link', { name: /More details/ })).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryParagraph).toBeInTheDocument();
  });
  it('Teste se existe seção com os mapas', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/ });
    userEvent.click(moreDetails);

    const mapsTitle = screen.getByRole('heading', { name: /Game Locations of/ });

    expect(mapsTitle).toBeInTheDocument();
  });
});
