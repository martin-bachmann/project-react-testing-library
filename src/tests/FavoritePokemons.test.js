import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('03 - Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida uma mensagem se não tiver pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoritesText = screen.getByText(/No favorite pokemon found/);

    expect(noFavoritesText).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os pokemons favoritados', () => {
    renderWithRouter(<App />);

    // Favorita primeiro pokemon
    const moreDetails = screen.getByRole('link', { name: /More details/ });
    userEvent.click(moreDetails);

    const favorite = screen.getByLabelText(/Pokémon favoritado?/);
    userEvent.click(favorite);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    // Favorita segundo pokemon
    const nextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(nextPokemon);

    const moreDetails2 = screen.getByRole('link', { name: /More details/ });
    userEvent.click(moreDetails2);

    const favorite2 = screen.getByLabelText(/Pokémon favoritado?/);
    userEvent.click(favorite2);

    const homeLink2 = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink2);

    // Verifica se estão exibidos na página favoritos
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(2);
  });
});
