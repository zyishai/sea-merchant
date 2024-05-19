import { AbsolutePosition, Button, CenteredColumn } from '../primitives/styles.module.css';
import ShipPanel from './Ship/ShipPanel';
import FinancePanel from './FinancePanel';
import CurrentLocation from './CurrentLocation';
import { MarketStatus } from './MarketStatus';
import { StormEvent } from '../Event/Storm';
import { AbandonedShipEvent } from '../Event/AbandonedShip';
import { PiratesEvent } from '../Event/Pirates';
import { Clock } from '../clock';
import { px } from '~/utils';
import { processCommand } from '~/store/signals';
import { useEffect } from 'react';
import { RestCommand, SailCommand } from '~/store/command';
import { Repair } from './Repair';
import { Alerts } from './Alerts';
import { Container } from '@radix-ui/themes';
import { AnimationStageProvider, useAnimationStage } from '~/components/AnimationStage';
import { useSignal } from '~/hooks/use-signal';

export function GameScreen() {
  return (
    <AnimationStageProvider initialStage='arrive'>
      <GameLayout />
    </AnimationStageProvider>
  )
}

function GameLayout() {
  const stage = useAnimationStage();
  const [command, resetCommand] = useSignal(processCommand);

  useEffect(() => {
    // Initiate animation flow when a SailCommand occurs
    if (stage.current === 'idle' && command instanceof SailCommand && SailCommand.canSail({ disableWarnings: true })) {
      stage.next();
      resetCommand();
    }
  }, [command, stage]);

  return (
    <Container position='relative' height="100vh">
      {/* Alerts */}
      <Alerts />

      {/* Map */}
      <CurrentLocation />

      {/* Info cards */}
      <AbsolutePosition top={px(50)} left={px(50)}>
        <CenteredColumn gap={px(30)} inline='stretch'>
          <Clock />
          <FinancePanel />
          <ShipPanel />
          <Repair />
          <Button
            variant='primary'
            color='gold'
            size='big'
            style={{alignSelf: 'center'}}
            onClick={() => processCommand(new RestCommand)}>Rest until tomorrow</Button>
        </CenteredColumn>
      </AbsolutePosition>

      {/* Market card */}
      <AbsolutePosition top={px(50)} right={px(50)}>
        <CenteredColumn gap={px(20)} inline='stretch'>
          <MarketStatus />
        </CenteredColumn>
      </AbsolutePosition>

      {/* Events */}
      <StormEvent />
      <AbandonedShipEvent />
      <PiratesEvent />
    </Container>
  )
}
