import { Container, Group, Heading, Title, Item, SvgImage, applyStyle } from "./styles.module.css";
import * as Tooltip from '@radix-ui/react-tooltip';
import { motion } from "framer-motion";

interface Props extends React.PropsWithChildren {
  heading?: string;
}
export function Section({ heading, children }: Props) {
  return (
    <Container>
      {heading ? <Heading>{heading}</Heading> : null}
      {children}
    </Container>
  )
}

Section.Group = ({ title, children }: React.PropsWithChildren<{ title?: string }>) => {
  return (
    <Group>
      {title ? <Title>{title}</Title> : null}
      {children}
    </Group>
  );
}

Section.Item = ({ children }: React.PropsWithChildren) => {
  return (
    <Item>{children}</Item>
  )
}

Section.Image = ({ src, alt, tooltip }: {src: string; alt?: string; tooltip?: string}) => {
  return (
    <Tooltip.Root delayDuration={250}>
      <Tooltip.Trigger asChild>
        <SvgImage src={src} alt={alt} />
      </Tooltip.Trigger>
      {tooltip ? <Tooltip.Portal>
        <Tooltip.Content sideOffset={5} side='right' asChild>
          <Content initial={{ scale: 0 }} animate={{ scale: 1 }}>
            {tooltip}
            <Tooltip.Arrow />
          </Content>
        </Tooltip.Content>
      </Tooltip.Portal> : null}
    </Tooltip.Root>
  )
}

const Content = applyStyle('tooltip_content', motion.div);
