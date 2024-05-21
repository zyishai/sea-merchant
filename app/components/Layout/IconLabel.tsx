import { Flex, Slot, Text, Tooltip } from "@radix-ui/themes";
import { Img } from "./styles.module.css";

export function IconLabel({ asChild, icon, alt, tooltip, children }: React.PropsWithChildren<{asChild?: boolean, icon: string, alt?: string, tooltip?: string}>) {
  const Comp = asChild ? Slot : Text;
  return (
    <Flex gap='2' align='center'>
      {tooltip ? (<Tooltip content={tooltip} disableHoverableContent>
        <Img src={icon} alt={alt} size='32px' />
      </Tooltip>) : (
        <Img src={icon} alt={alt} size='32px' />
      )}
      <Comp as='span'>{children}</Comp>
    </Flex>
  )
}
