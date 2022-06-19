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
    const locationArray = screen.getAllByAltText(/location/);

    expect(mapsTitle).toBeInTheDocument();
    expect(pokemons[0].foundAt).toHaveLength(locationArray.length);

    locationArray.forEach((location, index) => {
      expect(location).toHaveAttribute('src', pokemons[0].foundAt[index].map);
    });
  });
  it('Teste se pode favoritar um pokemon', () => {
    renderWithRouter(<App />);

    // Verifica a adição de um pokemon
    const moreDetails = screen.getByRole('link', { name: /More details/ });
    userEvent.click(moreDetails);

    const favorite = screen.getByLabelText(/Pokémon favoritado?/);
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    const favPokemons = screen.getAllByTestId('pokemon-name');
    expect(favPokemons).toHaveLength(1);

    // Verifica a remoção de um pokemon
    const moreDetails2 = screen.getByRole('link', { name: /More details/ });
    userEvent.click(moreDetails2);

    const favorite2 = screen.getByLabelText(/Pokémon favoritado?/);
    expect(favorite2).toBeInTheDocument();
    userEvent.click(favorite2);

    const favoriteLink2 = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink2);

    const favPokemons2 = screen.queryAllByTestId('pokemon-name');
    expect(favPokemons2).toHaveLength(0);
  });
});
