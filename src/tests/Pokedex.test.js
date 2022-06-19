import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const constName = 'pokemon-name';
const constNext = 'next-pokemon';

describe('06 - Teste o componente <Pokemon.js />', () => {
  it('Teste se a página contém um título', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading', {
      name: /Encountered pokémons/ });

    expect(pokedexTitle).toBeInTheDocument();
  });
  it('Teste o botão de próximo pokemon', () => {
    renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const pokeName = screen.getByTestId(constName);
      expect(pokeName).toHaveTextContent(pokemon.name);
      const nextPokemon = screen.getByTestId(constNext);
      userEvent.click(nextPokemon);
    });

    const pokeName = screen.getByTestId(constName);
    expect(pokeName).toHaveTextContent(pokemons[0].name);
  });
  it('Teste se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);

    const filteredPokes = pokemons.filter((pokemon) => {
      const pokeName = screen.getByTestId(constName);
      return pokeName.innerHTML === pokemon.name;
    });

    expect(filteredPokes).toHaveLength(1);
  });
  it('Teste se é mostrado um botão de cada tipo', () => {
    renderWithRouter(<App />);

    const pokeTypes = [...new Set(pokemons.reduce(
      (types, { type }) => [...types, type], [],
    ))];

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons).toHaveLength(pokeTypes.length);

    pokeTypes.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      expect(buttonType).toBeInTheDocument();
      userEvent.click(buttonType);
      const filteredPokes = pokemons.filter((pokemon) => pokemon.type === type);
      filteredPokes.forEach((pokemon2) => {
        const pokeName = screen.getByTestId(constName);
        expect(pokeName).toHaveTextContent(pokemon2.name);
        const nextPokemon = screen.getByTestId(constNext);
        userEvent.click(nextPokemon);
      });
    });

    const buttonType = screen.getByRole('button', { name: /All/ });
    expect(buttonType).toBeInTheDocument();
    userEvent.click(buttonType);
    pokemons.forEach((pokemon3) => {
      const pokeName = screen.getByTestId(constName);
      expect(pokeName).toHaveTextContent(pokemon3.name);
      const nextPokemon = screen.getByTestId(constNext);
      userEvent.click(nextPokemon);
    });
  });
});
