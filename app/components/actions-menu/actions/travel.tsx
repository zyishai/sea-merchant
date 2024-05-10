import React, { useState } from "react";
import { Container, LocationPicker, Section, CtaButton, LocationOption } from './travel.module.css';
import { type Location as GameLocation, locations, useLocation, useShip, useWallet } from "~/store/game";
import { capitalize } from "~/utils";
import IsraelMap from "~/components/graphics/israel-map";
import EgyptMap from "~/components/graphics/egypt-map";
import TurkeyMap from "~/components/graphics/turkey-map";
import { compose, pick } from "@holycow/state";
import { Modal } from "~/components/Modal";
import { ActionButton } from "../styles.module.css";

const locationProperties: Record<GameLocation, { component: React.FC; color: string }> = {
  israel: {
    component: IsraelMap,
    color: '#005EB8'
  },
  egypt: {
    component: EgyptMap,
    color: '#C09300'
  },
  turkey: {
    component: TurkeyMap,
    color: '#C8102E'
  }
}

export function TravelAction() {
  return (
    <Modal
      trigger={<ActionButton>Travel</ActionButton>}>
      <TravelPanel />
    </Modal>
  )
}

function TravelPanel() {
  const [currentLocation, changeLocation] = useLocation('currentLocation', 'changeLocation');
  const { guardShipPrice } = useShip();
  const cash = useWallet('cash');
  const canBuyGuardShips = Math.floor(cash / guardShipPrice);
  const [guardShips, setGuardShips] = useState(0);
  const onSetGuardShip = compose(
    setGuardShips,
    pick('target.value')
  );
  const [destination, setDestination] = useState<GameLocation | null>(null);
  const onSail = () => {
    if (!destination) return;
    changeLocation(destination, guardShips);
  }

  return (
    <Container>
      <h1>Where do you want to go next?</h1>
      <LocationPicker>
        {Object.values(locations).map((locName) => locName !== currentLocation ? (
          <LocationOption 
            key={locName} 
            color={locationProperties[locName].color} 
            selected={destination === locName} 
            onClick={() => {
              setDestination(locName);
            }}>
            <h3>{capitalize(locName)}</h3>
            {React.createElement(locationProperties[locName].component)}
          </LocationOption>
        ) : null)}
      </LocationPicker>

      <Section flex>
        <p>You can rent {canBuyGuardShips} guard ships. Each ship costs ${guardShipPrice}.</p>
        <p>How many do you want to rent?</p>
        <input type="number" value={guardShips} onChange={onSetGuardShip} min={0} max={canBuyGuardShips} />
      </Section>

      <Modal.CloseButton asChild>
        <CtaButton onClick={onSail}>Sail!</CtaButton>
      </Modal.CloseButton>
    </Container>
  );
}
