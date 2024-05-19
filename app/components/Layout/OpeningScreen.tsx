import { useGame } from "~/store/game";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";

export function OpeningScreen() {
  const startGame = useGame('startGame');

  return (
    <Container align='center' pt='7'>
      <Flex direction='column' align='center' gap='4'>
        <Heading as='h1' size='8'>Welcome, ambitious merchant!</Heading>
        <Text align='center' weight='medium'>In Sea Merchant, you'll compete to become the most prosperous merchant in the middle east. <br />
        Visit Israel, Egypt, and Turkey to buy and sell goods, but beware of the pirates and other unexpected occurrences! <br />
        Can you become the richest man in the Middle East?</Text>
        <Button size='4' variant='classic' onClick={startGame.bind(null, '')}>Let's begin</Button>
      </Flex>
    </Container>
  )
}
