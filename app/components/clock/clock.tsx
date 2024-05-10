import { useEffect, useState } from 'react';
import { useClock } from '~/store/game';
import { Container, Text } from './styles.module.css';
import { capitalize } from '~/utils';

export function Clock() {
  const clock = useClock();
  const [time, setTime] = useState<number | undefined>();
  const [day, setDay] = useState<string>(capitalize(clock.day));
  const hours = time?.toString() ?? '0';

  useEffect(() => {
    let timeoutId: number | string | NodeJS.Timeout;

    if (typeof time !== 'number') {
      setTime(clock.hours);
    } else if (time !== clock.hours) {
      timeoutId = setTimeout(() => setTime((time + 1) % 24), 200);
    } else {
      setDay(capitalize(clock.day));
    }

    return () => clearTimeout(timeoutId);
  }, [clock, time]);

  return (
    <Container>
      <Text>
        {day}
      </Text>
      <Text>
        {hours.padStart(2, '0')}:00
      </Text>
    </Container>
  )
}
