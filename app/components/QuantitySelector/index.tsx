import * as Slider from '@radix-ui/react-slider';
import { Label, applyStyle } from './styles.module.css';

type Props = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
};
export function QuantitySelector({ min, max, step, value, onChange }: Props) {
  return (
    <Selector value={[value]} onValueChange={values => onChange(values[0])} min={min} max={max} step={step}>
      <Track>
        <Range />
        <Label>{value}</Label>
      </Track>
      <Thumb />
    </Selector>
  )
}

const Selector = applyStyle('selector', Slider.Root);
const Track = applyStyle('track', Slider.Track);
const Range = applyStyle('range', Slider.Range);
const Thumb = applyStyle('thumb', Slider.Thumb);
