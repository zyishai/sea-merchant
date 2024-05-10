import { useWallet } from "~/store/wallet";
import { BorderedCard, CenteredColumn, FlexRow, ImageIcon } from "../primitives/styles.module.css";
import { px, rem } from "~/utils";

export default function FinancePanel() {
  const wallet = useWallet();

  return (
    <BorderedCard>
      <CenteredColumn>
        <h1 style={{ fontSize: rem(1.2) }}>Finances</h1>
        <FlexRow gap={px(50)} padding={px(0)}>
          <FlexRow gap={px(10)} inline='center'>
            <ImageIcon src='/cash.svg' alt='Cash' size={px(32)} />
            <span>${wallet.cash}</span>
          </FlexRow>
          <FlexRow gap={px(10)} inline='center'>
            <ImageIcon src='/bank.svg' alt='Bank' size={px(32)} />
            <span>${0}</span>
          </FlexRow>
        </FlexRow>
      </CenteredColumn>
    </BorderedCard>
  )
}
