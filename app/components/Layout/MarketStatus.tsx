import { rem } from "~/utils";
import { BorderedCard, CenteredColumn } from "../primitives/styles.module.css";
import { PriceTable } from "./PriceTable";

export function MarketStatus() {
  return (
    <BorderedCard>
      <CenteredColumn padding='15px 5px'>
        <h1 style={{ fontSize: rem(1.2) }}>Market Status</h1>
        <PriceTable style={{ padding: '0 35px 20px 35px', fontSize: rem(0.9) }} />
      </CenteredColumn>
    </BorderedCard>
  )
}
