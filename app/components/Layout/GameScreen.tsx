import { AbsolutePosition, CenteredColumn } from '../primitives/styles.module.css';
import ShipPanel from './Ship/ShipPanel';
import FinancePanel from './FinancePanel';
import CurrentLocation from './CurrentLocation';
import MarketStatus from './MarketStatus';
import { Clock } from '../clock';
import { px } from '~/utils';
import { processCommand } from '~/store/signals';
import { useEffect } from 'react';
import { SailCommand } from '~/store/command';
import { Alerts } from './Alerts';
import { Container } from '@radix-ui/themes';
import { AnimationStageProvider, useAnimationStage } from '~/components/AnimationStage';
import { useSignal } from '~/hooks/use-signal';
import ActionsPanel from './ActionsPanel';
import Events from './Events';

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
          <ActionsPanel />
        </CenteredColumn>
      </AbsolutePosition>

      {/* Market card */}
      <AbsolutePosition top={px(50)} right={px(50)}>
        <CenteredColumn gap={px(20)} inline='stretch'>
          <MarketStatus />
        </CenteredColumn>
      </AbsolutePosition>

      {/* Events */}
      <Events />
    </Container>
  )
}
