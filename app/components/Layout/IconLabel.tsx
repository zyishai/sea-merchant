import { Flex, Text, Tooltip } from "@radix-ui/themes";
import { Img } from "./styles.module.css";

export function IconLabel({ icon, alt, tooltip, children }: React.PropsWithChildren<{icon: string, alt?: string, tooltip?: string}>) {
  return (
    <Flex gap='2' align='center'>
      {tooltip ? (<Tooltip content={tooltip} disableHoverableContent>
        <Img src={icon} alt={alt} size='32px' />
      </Tooltip>) : (
        <Img src={icon} alt={alt} size='32px' />
      )}
      <Text as='span'>{children}</Text>
    </Flex>
  )
}
