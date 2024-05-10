import { BuyAction } from './actions/buy';
import { RestAction } from './actions/rest';
import { SellAction } from './actions/sell';
import { TravelAction } from './actions/travel';
import { Container } from './styles.module.css';

export function ActionsMenu() {
  return (
    <Container>
      <h1>Available Actions</h1>
      <TravelAction />
      <BuyAction />
      <SellAction />
      <RestAction />
    </Container>
  )
}
