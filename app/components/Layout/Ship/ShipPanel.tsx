import Goods from "./Goods";
import ShipProperties from "./ShipProperties";
import { applyStyle } from "../styles.module.css";
import { Box, Flex, Heading } from "@radix-ui/themes";

export default function ShipPanel() {
  return (
    <CustomCard>
      <Flex direction='column' align='center' gap='3'>
        <Heading size='5'>Ship & Goods</Heading>
        <Flex direction='column' gap='7'>
          <ShipProperties />
          <Goods />
        </Flex>
      </Flex>
    </CustomCard>
  )
}

const CustomCard = applyStyle('with_border_image', Box);
