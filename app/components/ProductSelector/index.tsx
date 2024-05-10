import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Product, products } from '~/store/product';
import { capitalize, px } from '~/utils';
import { applyStyle } from './styles.module.css';
import { ImageIcon } from '../primitives/styles.module.css';

type Props = {
  value: Product|undefined;
  onChange: (product: Product) => void;
}
export function ProductSelector({value, onChange}: Props) {
  return (
    <Group type='single' value={value} onValueChange={onChange}>
      {products.map((product) => (
        <Item key={product} value={product} active={value === product}>
          <ImageIcon 
            src={`/${product}.svg`} 
            alt={product} 
            size={px(36)} />
        </Item>
      ))}
    </Group>
  )
}

const Group = applyStyle('toggle_group', ToggleGroup.Root);
const Item = applyStyle('toggle_item', ToggleGroup.Item);
