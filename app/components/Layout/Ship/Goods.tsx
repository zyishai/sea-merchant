import React from "react";
import { capitalize } from "~/utils";
import { useShip } from "~/store/ship";
import { products } from "~/store/product";
import { Flex, Separator } from "@radix-ui/themes";
import { IconLabel } from "../IconLabel";

function Goods() {
  const { goods } = useShip();

  return (
    <Flex align='center'>
      {products.map((product, i) => (
        <Flex align='center' mr={i === products.length-1 ? '0' : '2'} ml={i === 0 ? '0' : '1'}>
          <IconLabel key={product} icon={`/${product}.svg`} alt={product} tooltip={capitalize(product)}>{goods[product]}</IconLabel>
          {i < products.length-1 ? <Separator orientation='vertical' size='2' ml='4' style={{ backgroundColor: 'transparent' }} /> : null}
        </Flex>
      ))}
    </Flex>
  )
}

export default React.memo(Goods);
