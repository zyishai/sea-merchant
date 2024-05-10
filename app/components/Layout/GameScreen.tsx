import { AbsolutePosition, Button, CenteredColumn, FullHeightContainer } from '../primitives/styles.module.css';
import * as Tooltip from '@radix-ui/react-tooltip';
import ShipPanel from './Ship/ShipPanel';
import FinancePanel from './FinancePanel';
import CurrentLocation from './CurrentLocation';
import { MarketStatus } from './MarketStatus';
import { StormEvent } from '../Event/Storm';
import { AbandonedShipEvent } from '../Event/AbandonedShip';
import { PiratesEvent } from '../Event/Pirates';
import { Clock } from '../clock';
import { px } from '~/utils';
import { on } from '@holycow/state';
import { locationChanged, processCommand, sailWarning } from '~/store/signals';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { RestCommand, SailCommand } from '~/store/command';
import { Repair } from './Repair';
import { SchedulerProvider } from '../Scheduler';
import { useSchedulerStage } from '~/hooks/use-scheduler-stage';
import { Alerts } from './Alerts';
import { eventResolved } from '~/store/event';

export function GameScreen() {
  // useEffect(() => {
  //   const unsubscribe = on(sailWarning, (message, options) => {
  //     const t = options?.error ? toast.error : toast.warning;
  //     t(message, { duration: 1500, closeButton: true, position: 'top-center' });
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <SchedulerProvider stages={['idle', 'clock', 'alert', 'leave', 'event', 'arrive']}>
      <GameLayout />
    </SchedulerProvider>
  )
}

function GameLayout() {
  const stage = useSchedulerStage();

  useEffect(() => {
    const unsubscribeProcessCommand = on(processCommand, (command) => {
      if (command instanceof SailCommand && SailCommand.canSail({ disableWarnings: true })) {
        stage.set('clock');
      }
    });
    
    const unsubscribeEventResolved = on(eventResolved, () => {
      stage.set('arrive');
    });

    return () => {
      unsubscribeProcessCommand();
      unsubscribeEventResolved();
    };
  }, []);

  return (
    <Tooltip.Provider>
      <FullHeightContainer style={{ height: '100%' }}>
        <Alerts />
        <CurrentLocation />
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
        <AbsolutePosition top={px(50)} right={px(50)}>
          <CenteredColumn gap={px(20)} inline='stretch'>
            <MarketStatus />
          </CenteredColumn>
        </AbsolutePosition>
        <StormEvent />
        <AbandonedShipEvent />
        <PiratesEvent />
      </FullHeightContainer>
    </Tooltip.Provider>
  )
}
