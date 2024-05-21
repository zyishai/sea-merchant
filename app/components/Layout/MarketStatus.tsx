import { PriceTable } from "./PriceTable";
import { applyStyle } from "./styles.module.css";
import { Box, Flex, Heading } from "@radix-ui/themes";
import React from "react";

function MarketStatus() {
  return (
    <CustomCard>
      <Flex direction='column' align='center' gap='3'>
        <Heading size='5' mt='2'>Market Status</Heading>
        <PriceTable />
      </Flex>
    </CustomCard>
  )
}

const CustomCard = applyStyle('with_border_image', Box);

export default React.memo(MarketStatus);
