import { useEffect, useMemo, useState } from "react";
import { DepositCommand, WithdrawalCommand } from "~/store/command";
import { processCommand } from "~/store/signals";
import { useWallet } from "~/store/wallet";

export function useBank() {
  const [action, setAction] = useState<'deposit'|'withdrawal'>('deposit');
  const [amount, setAmount] = useState(0);
  const wallet = useWallet();

  useEffect(() => {
    setAmount(0);
  }, [action])

  return useMemo(() => ({
    balance: wallet.bank,
    action,
    changeAction: setAction,
    requested: amount,
    updateRequested: setAmount,
    commit: () => {
      if (action === 'deposit') {
        processCommand(new DepositCommand(amount))
      } else if (action === 'withdrawal') {
        processCommand(new WithdrawalCommand(amount))
      }
    },
    exit: () => {
      setAction('deposit');
      setAmount(0);
    }
  }), [action, amount, wallet]);
}
