import random from "random";

export function capitalize(text: string) {
  return text.replace(/\b(\w)(\S+)\b/g, (_, l: string, s: string) => l.toUpperCase() + s);
}

export function url(src: string) {
  return `url(${src})`;
}

export function px(value: number) {
  return `${value}px`;
}

export function em(value: number) {
  return `${value}em`;
}

export function rem(value: number) {
  return `${value}rem`;
}

export function randInt(min: number, max: number, increment: number = 1) {
  const value = random.uniformInt(min, max)();
  return clipToIncrement(value, increment);
}

export function clipToIncrement(value: number, increment: number) {
  return Math.floor(Math.round(value / increment)) * increment;
}
