import React from 'react';
import { Box, Card, Flex, Heading, Inset } from "@radix-ui/themes";
import { motion, useTransform } from "framer-motion";
import { useTimeAnimation } from "~/hooks/use-time-animation";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const Clock = React.memo(() => {
  const { time, day } = useTimeAnimation();
  const transformedTime = useTransform(time, value => {
    const hour = Math.floor(value);
    const minute = Math.floor((value - hour) / 0.25) * 15;

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  });
  const transformedDay = useTransform(day, dayIndex => days[dayIndex]);

  return (
    <Card variant='classic' style={{ boxShadow: 'var(--shadow-3)' }}>
      <Inset clip='padding-box'>
        <Box py='2' px='9' style={{ backgroundColor: 'var(--black-a11)' }}>
          <Flex align='center' justify='center'>
            <Heading as='h1' color='green' size='7' weight='bold'>
              <motion.span>{transformedDay}</motion.span>, <motion.span>{transformedTime}</motion.span>
            </Heading>
          </Flex>
        </Box>
      </Inset>
    </Card>
  );
});
