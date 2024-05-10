import { px } from "~/utils";
import { CenteredColumn, FlexRow, ImageIcon } from "../../primitives/styles.module.css";
import { useShip } from "~/store/ship";
import { products } from "~/store/product";

export function Goods() {
  const { goods } = useShip();

  return (
    <CenteredColumn inline="start" gap={px(10)}>
      {products.map((product) => (
        <FlexRow key={product} inline="center">
          <ImageIcon src={`/${product}.svg`} alt={product} size={px(32)} />
          <span>{goods[product]} T</span>
        </FlexRow>
      ))}
    </CenteredColumn>
  )
}
