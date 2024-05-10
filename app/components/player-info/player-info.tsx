import { products, useGame, useShip, useWallet } from "~/store/game";
import { Container, Picture, Title, Entry, Separator } from './styles.module.css';
import shipIcon from '/ship.svg?url';
import cashIcon from '/cash.svg?url';
import copperIcon from '/copper.svg?url';
import wheatIcon from '/wheat.svg?url';
import oliveIcon from '/olive.svg?url';

export function PlayerInfo() {
  const playerName = useGame('playerName');
  const cash = useWallet('cash');
  const ship = useShip();

  return (
    <Container>
      <Title>{playerName}</Title>
      <Separator />
      <Title variant='secondary'>Cash</Title>
      <Entry>
        <Picture src={cashIcon} />
        <p>${cash}</p>
      </Entry>
      <Separator />
      <Title variant='secondary'>Vessel</Title>
      <Entry>
        <Picture src={shipIcon} />
        <p>{ship.volume} / {ship.capacity} T</p>
      </Entry>
      <Separator />
      <Title variant='secondary'>Goods</Title>
      <Entry>
        <Picture src={copperIcon} title="Copper" />
        <p>{ship.goods[products.copper]} T</p>
      </Entry>
      <Entry>
        <Picture src={wheatIcon} title="Wheat" />
        <p>{ship.goods[products.wheat]} T</p>
      </Entry>
      <Entry>
        <Picture src={oliveIcon} title="Olive" />
        <p>{ship.goods[products.olive]} T</p>
      </Entry>
      <Separator />
    </Container>
  )
}
