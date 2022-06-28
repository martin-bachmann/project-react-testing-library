import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('05 - Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de um pokemon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImage = screen.getByAltText(/sprite/);

    expect(pokeName).toHaveTextContent(/Pikachu/);
    expect(pokeType).toHaveTextContent(/Electric/);
    expect(pokeWeight).toHaveTextContent(/Average weight: 6.0 kg/);
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  });
  it('Teste se contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/ });

    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });
  it('Teste se ao clicar no link de de detalhes abre página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/ });
    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Teste se pokemon favoritado recebe destaque', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/ });
    userEvent.click(moreDetails);

    const favorite = screen.getByLabelText(/Pokémon favoritado?/);
    userEvent.click(favorite);

    const pokeImage = screen.getByAltText(/is marked as favorite/);

    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
