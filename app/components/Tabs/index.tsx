import * as TabsPrimitive from '@radix-ui/react-tabs';
import React, { useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { applyStyle } from './styles.module.css';

const TabsContext = React.createContext<{ active: string, ref: HTMLDivElement|null }>({} as any);

export function Tabs({ defaultValue, children }: React.PropsWithChildren<{ defaultValue?: string }>) {
  const [ref, setRef] = useState<HTMLDivElement|null>(null);
  const [active, setActive] = useState<string>(defaultValue ?? '');

  return (
    <TabsPrimitive.Root defaultValue={defaultValue} value={active} onValueChange={setActive}>
      <TabsContext.Provider value={{ref, active}}>
        <List style={{ marginBottom: 10 }}>
          {children}
        </List>
        <div style={{ display: 'contents' }} ref={setRef}></div>
      </TabsContext.Provider>
    </TabsPrimitive.Root>
  )
}

interface TabProps extends React.PropsWithChildren {
  trigger: React.ReactNode | string;
  value: string;
}
Tabs.Tab = ({ trigger, value, children }: TabProps) => {
  const {ref} = useContext(TabsContext);

  return !ref
    ? null 
    : (
      [
        <Trigger key={value} asChild={typeof trigger !== 'string'} value={value}>{trigger}</Trigger>,
        createPortal(
          <Content key={value} value={value}>{children}</Content>,
          ref
        )
      ]
    )
}

const List = applyStyle('tab_list', TabsPrimitive.List);
const Trigger = applyStyle('tab_button', TabsPrimitive.Trigger);
const Content = applyStyle('tab_content', TabsPrimitive.Content);
