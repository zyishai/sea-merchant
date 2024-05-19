import { Box, Flex, Heading } from "@radix-ui/themes";
import { useWallet } from "~/store/wallet";
import { IconLabel } from "./IconLabel";
import { applyStyle } from "./styles.module.css";
import React from "react";

function FinancePanel() {
  const wallet = useWallet();

  return (
    <CustomCard>
      <Flex direction='column' align='center' gap='3'>
        <Heading size='5'>Finances</Heading>
        <Flex direction='column' gap='2'>
          <IconLabel icon='/cash.svg' alt='Cash' tooltip="Cash">${wallet.cash}</IconLabel>
          <IconLabel icon='/bank.svg' alt='Bank' tooltip="Bank">${0}</IconLabel>
        </Flex>
      </Flex>
    </CustomCard>
  )
}

const CustomCard = applyStyle('with_border_image', Box);

export default React.memo(FinancePanel);
