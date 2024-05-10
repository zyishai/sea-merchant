import { BorderedCard, CenteredColumn, FlexRow } from "../../primitives/styles.module.css";
import { px, rem } from "~/utils";
import { Goods } from "./Goods";
import ShipProperties from "./ShipProperties";

export default function ShipPanel() {
  return (
    <BorderedCard padding="30px 60px">
      <CenteredColumn gap={px(15)} padding={px(0)}>
        <h1 style={{ fontSize: rem(1.2) }}>Ship & Goods</h1>
        <FlexRow gap={px(70)}>
          <ShipProperties />
          <Goods />
        </FlexRow>
      </CenteredColumn>
    </BorderedCard>
  )
}
