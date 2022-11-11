import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('#Pokemon', () => {
  // beforeEach(() => {
  //   renderWithRouter(<App />);
  // });
  describe('Testes referentes ao card com as informações do pokémon', () => {
    test('(1) o link de detalhes do pokemon deve redirecionamentar para a página de detalhes de pokémon', async () => {
      renderWithRouter(<App />);
      const pikachu = screen.getByText('Pikachu');
      expect(pikachu).toBeVisible();

      const pikachuType = screen.getByTestId('pokemon-type');
      expect(pikachuType).toHaveTextContent('Electric');
      expect(pikachuType).toBeVisible();

      const pikachuImage = screen.getByAltText('Pikachu sprite');
      expect(pikachuImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pikachuImage).toBeVisible();

      const moreDetails = screen.getByText('More details');
      expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
      expect(moreDetails).toBeVisible();
    });
    test('(2) a página de detalhes deve ter um URL com a configuração /pokemon/<id do pokemon>', async () => {
      const { history } = renderWithRouter(<App />);
      const moreDetails = screen.getByText('More details');
      const pikachu = screen.getByText('Pikachu');

      userEvent.click(moreDetails);

      await screen.findByText('Pikachu Details');
      expect(history.location.pathname).toBe('/pokemons/25');
    });
  });
  describe('Testes referentes aos pokemons favoritados', () => {
    test('(3) o ícone do pokemon favoritado deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg', async () => {
      renderWithRouter(<App />);

      // entrar na páginade detalhes
      userEvent.click(screen.getByText('More details'));
      await screen.findByText('Pikachu Details');

      // clicar no checkBox para favoritar
      userEvent.click(screen.getByLabelText('Pokémon favoritado?'));

      // verifica se na imagem do pokemon aparece o icone de uma estrela
      const favoriteStar = await screen.findByAltText('Pikachu is marked as favorite');
      expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
      expect(favoriteStar).toBeVisible();
    });
  });
});
